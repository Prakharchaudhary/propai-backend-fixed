import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingsDocument = Settings & Document;

class Media {
  @Prop({ default: '' })
  url!: string;

  @Prop({ default: '' })
  publicId!: string;
}

class Banner {
  @Prop({ type: Media, default: {} })
  image!: Media;

  @Prop({ default: '' })
  title!: string;

  @Prop({ default: '' })
  subtitle!: string;

  @Prop({ default: '' })
  ctaText!: string;

  @Prop({ default: '' })
  ctaLink!: string;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ default: 0 })
  order!: number;
}

class Contact {
  @Prop({ default: '' })
  phone!: string;

  @Prop({ default: '' })
  whatsapp!: string;

  @Prop({ default: '' })
  email!: string;

  @Prop({ default: '' })
  address!: string;
}

class Social {
  @Prop({ default: '' })
  facebook!: string;

  @Prop({ default: '' })
  instagram!: string;

  @Prop({ default: '' })
  youtube!: string;
}

class SEO {
  @Prop({ default: '' })
  metaTitle!: string;

  @Prop({ default: '' })
  metaDescription!: string;

  @Prop({ default: '' })
  googleAnalyticsId!: string;
}

@Schema({ timestamps: true })
export class Settings {
  // Future SaaS Support
  @Prop({ required: false })
  tenantId?: string;

  // Dealer Info
  @Prop({ default: 'PropAI Realty' })
  dealerName!: string;

  @Prop({ default: 'Your Dream Home Awaits' })
  tagline!: string;

  // Branding
  @Prop({ type: Media, default: {} })
  logo!: Media;

  @Prop({ type: Media, default: {} })
  favicon!: Media;

  // Theme Colors
  @Prop({ default: '#1a2f5a' })
  primaryColor!: string;

  @Prop({ default: '#2563eb' })
  secondaryColor!: string;

  // Homepage Banners
  @Prop({ type: [Banner], default: [] })
  banners!: Banner[];

  // Contact Details
  @Prop({ type: Contact, default: {} })
  contact!: Contact;

  // Social Media Links
  @Prop({ type: Social, default: {} })
  social!: Social;

  // SEO Configuration
  @Prop({ type: SEO, default: {} })
  seo!: SEO;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);