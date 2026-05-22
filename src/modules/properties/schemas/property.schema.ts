import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PropertyDocument = Property & Document;

@Schema({ timestamps: true })
export class Property {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['apartment', 'villa', 'plot', 'commercial'] })
  propertyType: string;

  @Prop({ required: true, enum: ['sale', 'rent'] })
  listingType: string;

  @Prop({ default: 'active', enum: ['active', 'sold', 'rented', 'draft'] })
  status: string;

  @Prop()
  configuration: string;

  @Prop()
  bedrooms: number;

  @Prop()
  bathrooms: number;

  @Prop()
  area: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  priceLabel: string;

  @Prop()
  locality: string;

  @Prop({ required: true })
  city: string;

  @Prop()
  address: string;

  @Prop([String])
  amenities: string[];

  @Prop([{ url: String, publicId: String, isPrimary: Boolean }])
  images: { url: string; publicId: string; isPrimary: boolean }[];

  @Prop()
  brochureUrl: string;

  @Prop()
  brochurePublicId: string;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ default: 0 })
  viewCount: number;

  @Prop({ default: 0 })
  enquiryCount: number;

  @Prop()
  reraNumber: string;

  @Prop({ unique: true, sparse: true })
  slug: string;

  @Prop({ type: Number })
  lat: number;

  @Prop({ type: Number })
  lng: number;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
