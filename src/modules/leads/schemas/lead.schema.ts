import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeadDocument = Lead & Document;

@Schema({ timestamps: true })
export class Lead {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  email: string;

  @Prop()
  message: string;

  @Prop({
    default: 'website_form',
    enum: ['website_form', 'chatbot', 'voice', 'whatsapp', 'referral'],
  })
  source: string;

  @Prop({
    default: 'new',
    enum: ['new', 'contacted', 'qualified', 'site_visit', 'converted', 'lost'],
  })
  status: string;

  @Prop({ default: 'medium', enum: ['low', 'medium', 'high', 'urgent'] })
  priority: string;

  @Prop({ type: Object })
  intent: {
    propertyType?: string;
    configuration?: string;
    location?: string;
    budget?: { min: number; max: number };
    purpose?: string;
    urgency?: string;
  };

  @Prop()
  propertyId: string;

  @Prop()
  propertyTitle: string;

  @Prop()
  notes: string;

  @Prop()
  followUpDate: Date;

  @Prop()
  utmSource: string;

  @Prop()
  sessionId: string;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
