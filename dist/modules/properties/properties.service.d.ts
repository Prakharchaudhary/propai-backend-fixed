import { Model } from 'mongoose';
import { Property, PropertyDocument } from './schemas/property.schema';
import { MediaService } from '../media/media.service';
export declare class PropertiesService {
    private propertyModel;
    private mediaService;
    constructor(propertyModel: Model<PropertyDocument>, mediaService: MediaService);
    private generateSlug;
    findAll(filters?: any): Promise<(import("mongoose").Document<unknown, {}, PropertyDocument> & Property & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findBySlug(slug: string): Promise<import("mongoose").Document<unknown, {}, PropertyDocument> & Property & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, PropertyDocument> & Property & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getFeatured(): Promise<(import("mongoose").Document<unknown, {}, PropertyDocument> & Property & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    create(data: any, imageFiles?: any[], brochureFile?: any): Promise<import("mongoose").Document<unknown, {}, PropertyDocument> & Property & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, data: any, imageFiles?: any[]): Promise<import("mongoose").Document<unknown, {}, PropertyDocument> & Property & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteImage(propertyId: string, publicId: string): Promise<import("mongoose").Document<unknown, {}, PropertyDocument> & Property & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    softDelete(id: string): Promise<import("mongoose").Document<unknown, {}, PropertyDocument> & Property & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
