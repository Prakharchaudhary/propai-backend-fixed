import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    get(): Promise<import("mongoose").Document<unknown, {}, import("./schemas/settings.schema").SettingsDocument> & import("./schemas/settings.schema").Settings & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(body: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/settings.schema").SettingsDocument> & import("./schemas/settings.schema").Settings & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    uploadLogo(file: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/settings.schema").SettingsDocument> & import("./schemas/settings.schema").Settings & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    uploadFavicon(file: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/settings.schema").SettingsDocument> & import("./schemas/settings.schema").Settings & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addBanner(body: any, file: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/settings.schema").SettingsDocument> & import("./schemas/settings.schema").Settings & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteBanner(bannerId: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/settings.schema").SettingsDocument> & import("./schemas/settings.schema").Settings & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateBannerOrder(body: {
        banners: {
            id: string;
            order: number;
        }[];
    }): Promise<import("mongoose").Document<unknown, {}, import("./schemas/settings.schema").SettingsDocument> & import("./schemas/settings.schema").Settings & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
