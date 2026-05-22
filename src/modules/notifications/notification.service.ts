import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  private getTransporter() {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string) {
    try {
      await this.getTransporter().sendMail({
        from: `"PropAI" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
      });
    }  catch (err) {
  this.logger.error(`Email failed: ${(err as Error).message}`);
}
  }

  async sendWhatsApp(phone: string, message: string) {
    const token = process.env.WHATSAPP_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    if (!token || !phoneNumberId) return;

    const normalized = phone.replace(/\D/g, '').replace(/^0/, '91');
    try {
      await fetch(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: normalized,
          type: 'text',
          text: { body: message },
        }),
      });
    } catch (err) {
  this.logger.error(`Email failed: ${(err as Error).message}`);
}
  }

  async notifyNewLead(lead: any) {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminWhatsApp = process.env.ADMIN_WHATSAPP;
    const intent = lead.intent || {};

    const intentText = [
      intent.propertyType && `Type: ${intent.propertyType}`,
      intent.configuration && `Config: ${intent.configuration}`,
      intent.location && `Location: ${intent.location}`,
      intent.budget?.max && `Budget: ₹${intent.budget.max}`,
    ].filter(Boolean).join(' | ');

    if (adminEmail) {
      const html = `
        <div style="font-family:Arial;max-width:600px;">
          <h2 style="color:#1a2f5a;">🔔 New Lead — PropAI</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold;">Name</td><td style="padding:8px;">${lead.name}</td></tr>
            <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold;">Phone</td><td style="padding:8px;">${lead.phone}</td></tr>
            <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold;">Email</td><td style="padding:8px;">${lead.email || 'N/A'}</td></tr>
            <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold;">Source</td><td style="padding:8px;">${lead.source}</td></tr>
            <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold;">Message</td><td style="padding:8px;">${lead.message || 'N/A'}</td></tr>
            <tr><td style="padding:8px;background:#f5f5f5;font-weight:bold;">Intent</td><td style="padding:8px;">${intentText || 'N/A'}</td></tr>
          </table>
        </div>`;
      await this.sendEmail(adminEmail, `🔔 New Lead: ${lead.name} (${lead.phone})`, html);
    }

    if (adminWhatsApp) {
      await this.sendWhatsApp(
        adminWhatsApp,
        `🔔 *New Lead — PropAI*\n\n👤 *Name:* ${lead.name}\n📞 *Phone:* ${lead.phone}\n📌 *Source:* ${lead.source}\n💬 *Message:* ${lead.message || 'N/A'}\n${intentText ? `🏠 *Intent:* ${intentText}` : ''}`,
      );
    }
  }
}