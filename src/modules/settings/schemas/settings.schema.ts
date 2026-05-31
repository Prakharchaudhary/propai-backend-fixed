import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingsDocument = Settings & Document;

class Media {
  @Prop({ default: '' })
  url!: string;

  @Prop({ default: '' })
  publicId!: string;
}

// ← @Schema() added so Mongoose generates _id for each banner subdocument
@Schema({ _id: true })
class Banner {
  @Prop({ type: Media, default: {} })
  image!: Media;

  @Prop({ default: '' })
  videoUrl!: string;

  @Prop({ default: 'image' })
  mediaType!: string;

  @Prop({ default: '' })
  title!: string;

  @Prop({ default: '' })
  subtitle!: string;

  @Prop({ default: '' })
  badge!: string;

  @Prop({ default: '' })
  ctaText!: string;

  @Prop({ default: '' })
  ctaLink!: string;

  @Prop({ default: '' })
  ctaSecondaryText!: string;

  @Prop({ default: '' })
  ctaSecondaryLink!: string;

  @Prop({ default: 50 })
  overlayOpacity!: number;

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
  @Prop({ required: false })
  tenantId?: string;

  @Prop({ default: 'PropAI Realty' })
  dealerName!: string;

  @Prop({ default: 'Your Dream Home Awaits' })
  tagline!: string;

  @Prop({ type: Media, default: {} })
  logo!: Media;

  @Prop({ type: Media, default: {} })
  favicon!: Media;

  @Prop({ default: '#f8fafc' })
  bgColor!: string;

  @Prop({ default: '#2563eb' })
  accentColor!: string;

  @Prop({ default: '#ffffff' })
  cardColor!: string;

  @Prop({ default: '#1a2f5a' })
  primaryColor!: string;

  @Prop({ default: '#2563eb' })
  secondaryColor!: string;

  @Prop({ type: [Banner], default: [] })
  banners!: Banner[];

  @Prop({ default: 5000 })
  bannerInterval!: number;

  @Prop({ type: Contact, default: {} })
  contact!: Contact;

  @Prop({ type: Social, default: {} })
  social!: Social;

  @Prop({ type: SEO, default: {} })
  seo!: SEO;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);