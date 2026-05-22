import { Document } from 'mongoose';
export type PropertyDocument = Property & Document;
export declare class Property {
    title: string;
    description: string;
    propertyType: string;
    listingType: string;
    status: string;
    configuration: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    price: number;
    priceLabel: string;
    locality: string;
    city: string;
    address: string;
    amenities: string[];
    images: {
        url: string;
        publicId: string;
        isPrimary: boolean;
    }[];
    brochureUrl: string;
    brochurePublicId: string;
    isFeatured: boolean;
    viewCount: number;
    enquiryCount: number;
    reraNumber: string;
    slug: string;
    lat: number;
    lng: number;
}
export declare const PropertySchema: import("mongoose").Schema<Property, import("mongoose").Model<Property, any, any, any, Document<unknown, any, Property> & Property & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Property, Document<unknown, {}, import("mongoose").FlatRecord<Property>> & import("mongoose").FlatRecord<Property> & {
    _id: import("mongoose").Types.ObjectId;
}>;
