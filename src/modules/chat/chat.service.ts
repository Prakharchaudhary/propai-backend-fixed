import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatSession, ChatSessionDocument } from './schemas/chat-session.schema';
import { Property, PropertyDocument } from '../properties/schemas/property.schema';
import { Lead, LeadDocument } from '../leads/schemas/lead.schema';
import { NotificationService } from '../notifications/notification.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatSession.name)
    private chatModel: Model<ChatSessionDocument>,
    @InjectModel(Property.name)
    private propertyModel: Model<PropertyDocument>,
    @InjectModel(Lead.name)
    private leadModel: Model<LeadDocument>,
    private notificationService: NotificationService,
  ) {}

  async chat(sessionId: string, userMessage: string, propertyContext?: {
    lat?: number;
    lng?: number;
    address?: string;
    title?: string;
  }) {
    let session = await this.chatModel.findOne({ sessionId });
    if (!session) {
      session = new this.chatModel({ sessionId, messages: [] });
    }

    session.messages.push({ role: 'user', content: userMessage, timestamp: new Date() });

    // Check if user is asking about locality
    const localityKeywords = ['metro', 'hospital', 'school', 'mall', 'restaurant', 'bank', 'bus', 'market', 'paas', 'nearby', 'nazdeek', 'door', 'distance', 'locality', 'area', 'kaun sa', 'kahan'];
    const isLocalityQuery = localityKeywords.some((kw) =>
      userMessage.toLowerCase().includes(kw),
    );

    let localityData: any = null;

    if (isLocalityQuery && propertyContext?.lat && propertyContext?.lng) {
      try {
        const localityRes = await fetch(
          `${process.env.BACKEND_URL || 'http://localhost:8080'}/api/v1/locality/ask`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              question: userMessage,
              propertyLat: propertyContext.lat,
              propertyLng: propertyContext.lng,
              propertyAddress: propertyContext.address || '',
            }),
          },
        );
        localityData = await localityRes.json();
      } catch (err) {
        console.log('Locality API error:', err);
      }
    }

    // Fetch properties for general queries
    const properties = await this.propertyModel
      .find({ status: 'active' })
      .select('title city locality propertyType listingType bedrooms price priceLabel configuration slug')
      .limit(20)
      .lean();

    const propertyContext2 = properties
      .map((p) =>
        `- SLUG:${p.slug} | ${p.title} | ${p.configuration || ''} ${p.propertyType} | ${p.city}${p.locality ? ', ' + p.locality : ''} | ₹${p.priceLabel || p.price} | ${p.listingType}`,
      )
      .join('\n');

    const systemPrompt = `You are PropAI Assistant, an intelligent real estate AI for Indian property market.

${propertyContext?.title ? `CURRENT PROPERTY CONTEXT:
The user is currently viewing: "${propertyContext.title}" located at ${propertyContext.address || ''}.
Answer questions about this property and its locality.` : ''}

${localityData ? `LOCALITY DATA (from Google Places API):
AI Answer: ${localityData.answer || ''}

Raw Nearby Data:
${Object.entries(localityData.nearby || {}).map(([cat, items]: [string, any]) =>
  `${cat}:\n${items.map((i: any) => `  - ${i.name} (${i.vicinity}) Rating: ${i.rating || 'N/A'}`).join('\n')}`
).join('\n\n')}

Use this data to answer the user's locality question accurately.` : ''}

AVAILABLE PROPERTIES:
${propertyContext2}

YOUR ROLE:
- Help buyers find properties using natural language (English + Hindi both supported)
- Answer locality questions using the provided locality data
- Collect lead info naturally (name, phone) when user shows interest
- Be conversational, friendly, and helpful
- Keep responses short and clean

STRICT RULES:
- NEVER show SLUG values to the user
- NEVER show the JSON capture block to the user
- Only show property title, price, location, and configuration

LEAD CAPTURE RULES:
- If user asks for site visit, brochure, or shows interest → ask for name and phone
- Once you have both name and phone, add this JSON on the very last line:
{"captureLeadName": "ACTUAL_NAME", "captureLeadPhone": "ACTUAL_PHONE", "captureLeadIntent": {}}

Keep responses concise. Use ₹ for prices. Be warm and helpful.`;

    const history = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }],
      },
      {
        role: 'model',
        parts: [{ text: 'Understood. I am PropAI Assistant, ready to help.' }],
      },
      ...session.messages.slice(-10).map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
    ];

    const geminiRes = await fetch(
       `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,  
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: history,
          generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
        }),
      },
    );

    if (!geminiRes.ok) {
      const err = await geminiRes.text();
      console.log('GEMINI ERROR =>', err);
      return {
        reply: 'AI service temporarily unavailable.',
        sessionId,
        leadCaptured: false,
        properties: [],
      };
    }

    const geminiData = await geminiRes.json();
    const rawReply: string =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Sorry, I could not process your request. Please try again.';

    let replyText = rawReply;
    let leadCapture: any = null;
    const jsonMatch = rawReply.match(/\{"captureLeadName"[^}]*\}/s);
    if (jsonMatch) {
      try {
        leadCapture = JSON.parse(jsonMatch[0]);
        replyText = rawReply.replace(jsonMatch[0], '').trim();
      } catch (_) {}
    }

    replyText = replyText
      .replace(/SLUG:\S+/g, '')
      .replace(/\bSLUG\b/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    session.messages.push({ role: 'assistant', content: replyText, timestamp: new Date() });

    if (leadCapture?.captureLeadIntent) {
      session.extractedIntent = { ...session.extractedIntent, ...leadCapture.captureLeadIntent };
    }

    let leadCreated = false;
    if (leadCapture?.captureLeadName && leadCapture?.captureLeadPhone && !session.leadCaptured) {
      const lead = new this.leadModel({
        name: leadCapture.captureLeadName,
        phone: leadCapture.captureLeadPhone,
        source: 'chatbot',
        intent: session.extractedIntent || {},
        sessionId,
        status: 'new',
        priority: 'medium',
      });
      const saved = await lead.save();
      session.leadCaptured = true;
      session.leadId = (saved._id as any).toString();
      leadCreated = true;
      this.notificationService.notifyNewLead(saved).catch(() => {});
    }

    const mentionedSlugs = properties.filter((p) =>
      rawReply.includes(p.slug) || rawReply.includes(p.title),
    );

    await session.save();

    return {
      reply: replyText,
      sessionId,
      leadCaptured: leadCreated,
      properties: mentionedSlugs,
    };
  }

  async getSession(sessionId: string) {
    return this.chatModel.findOne({ sessionId }).exec();
  }
}

//  `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,  
