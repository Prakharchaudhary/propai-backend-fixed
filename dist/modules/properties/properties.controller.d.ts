import { PropertiesService } from './properties.service';
export declare class PropertiesController {
    private readonly propertiesService;
    constructor(propertiesService: PropertiesService);
    findAll(filters: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/property.schema").PropertyDocument> & import("./schemas/property.schema").Property & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getFeatured(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/property.schema").PropertyDocument> & import("./schemas/property.schema").Property & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(slug: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/property.schema").PropertyDocument> & import("./schemas/property.schema").Property & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    create(body: any, images: any[]): Promise<import("mongoose").Document<unknown, {}, import("./schemas/property.schema").PropertyDocument> & import("./schemas/property.schema").Property & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, body: any, images: any[]): Promise<import("mongoose").Document<unknown, {}, import("./schemas/property.schema").PropertyDocument> & import("./schemas/property.schema").Property & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteImage(id: string, publicId: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/property.schema").PropertyDocument> & import("./schemas/property.schema").Property & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    softDelete(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/property.schema").PropertyDocument> & import("./schemas/property.schema").Property & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAllAdmin(filters: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/property.schema").PropertyDocument> & import("./schemas/property.schema").Property & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
