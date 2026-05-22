import { Model } from 'mongoose';
import { Settings, SettingsDocument } from './schemas/settings.schema';
import { MediaService } from '../media/media.service';
export declare class SettingsService {
    private settingsModel;
    private mediaService;
    constructor(settingsModel: Model<SettingsDocument>, mediaService: MediaService);
    get(): Promise<import("mongoose").Document<unknown, {}, SettingsDocument> & Settings & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
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
    addBanner(data: any, file: any): Promise<import("mongoose").Document<unknown, {}, SettingsDocument> & Settings & import("mongoose").Document<any, any, any> & {
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
