import { Document } from 'mongoose';
export type SettingsDocument = Settings & Document;
declare class Media {
    url: string;
    publicId: string;
}
declare class Banner {
    image: Media;
    videoUrl: string;
    mediaType: string;
    title: string;
    subtitle: string;
    badge: string;
    ctaText: string;
    ctaLink: string;
    ctaSecondaryText: string;
    ctaSecondaryLink: string;
    overlayOpacity: number;
    isActive: boolean;
    order: number;
}
declare class Contact {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
}
declare class Social {
    facebook: string;
    instagram: string;
    youtube: string;
}
declare class SEO {
    metaTitle: string;
    metaDescription: string;
    googleAnalyticsId: string;
}
export declare class Settings {
    tenantId?: string;
    dealerName: string;
    tagline: string;
    logo: Media;
    favicon: Media;
    bgColor: string;
    accentColor: string;
    cardColor: string;
    primaryColor: string;
    secondaryColor: string;
    banners: Banner[];
    bannerInterval: number;
    contact: Contact;
    social: Social;
    seo: SEO;
}
export declare const SettingsSchema: import("mongoose").Schema<Settings, import("mongoose").Model<Settings, any, any, any, Document<unknown, any, Settings> & Settings & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Settings, Document<unknown, {}, import("mongoose").FlatRecord<Settings>> & import("mongoose").FlatRecord<Settings> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export {};
