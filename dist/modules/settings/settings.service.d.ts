import { Model } from 'mongoose';
import { Settings, SettingsDocument } from './schemas/settings.schema';
import { MediaService } from '../media/media.service';
export declare class SettingsService {
    private settingsModel;
    private mediaService;
    constructor(settingsModel: Model<SettingsDocument>, mediaService: MediaService);
    get(): Promise<(import("mongoose").Document<unknown, {}, SettingsDocument> & Settings & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }) | {
        tenantId?: string;
        dealerName: string;
        tagline: string;
        logo: {
            url: string;
            publicId: string;
        };
        favicon: {
            url: string;
            publicId: string;
        };
        bgColor: string;
        accentColor: string;
        cardColor: string;
        primaryColor: string;
        secondaryColor: string;
        banners: {
            image: {
                url: string;
                publicId: string;
            };
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
        }[];
        bannerInterval: number;
        contact: {
            phone: string;
            whatsapp: string;
            email: string;
            address: string;
        };
        social: {
            facebook: string;
            instagram: string;
            youtube: string;
        };
        seo: {
            metaTitle: string;
            metaDescription: string;
            googleAnalyticsId: string;
        };
        _id: any;
        __v?: any;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: import("mongoose").Schema;
    }>;
    update(data: any): Promise<import("mongoose").Document<unknown, {}, SettingsDocument> & Settings & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    uploadLogo(file: any): Promise<import("mongoose").Document<unknown, {}, SettingsDocument> & Settings & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    uploadFavicon(file: any): Promise<import("mongoose").Document<unknown, {}, SettingsDocument> & Settings & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addBanner(data: any, file?: any): Promise<import("mongoose").Document<unknown, {}, SettingsDocument> & Settings & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteBanner(bannerId: string): Promise<import("mongoose").Document<unknown, {}, SettingsDocument> & Settings & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateBannerOrder(banners: {
        id: string;
        order: number;
    }[]): Promise<import("mongoose").Document<unknown, {}, SettingsDocument> & Settings & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
