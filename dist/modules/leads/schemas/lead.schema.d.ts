import { Document } from 'mongoose';
export type LeadDocument = Lead & Document;
export declare class Lead {
    name: string;
    phone: string;
    email: string;
    message: string;
    source: string;
    status: string;
    priority: string;
    intent: {
        propertyType?: string;
        configuration?: string;
        location?: string;
        budget?: {
            min: number;
            max: number;
        };
        purpose?: string;
        urgency?: string;
    };
    propertyId: string;
    propertyTitle: string;
    notes: string;
    followUpDate: Date;
    utmSource: string;
    sessionId: string;
}
export declare const LeadSchema: import("mongoose").Schema<Lead, import("mongoose").Model<Lead, any, any, any, Document<unknown, any, Lead> & Lead & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Lead, Document<unknown, {}, import("mongoose").FlatRecord<Lead>> & import("mongoose").FlatRecord<Lead> & {
    _id: import("mongoose").Types.ObjectId;
}>;
