import { Document } from 'mongoose';
export type ChatSessionDocument = ChatSession & Document;
declare class Message {
    role: string;
    content: string;
    timestamp: Date;
}
export declare class ChatSession {
    sessionId: string;
    messages: Message[];
    extractedIntent: {
        propertyType?: string;
        configuration?: string;
        location?: string;
        budget?: {
            min?: number;
            max?: number;
        };
        purpose?: string;
    };
    leadCaptured: boolean;
    leadId: string;
}
export declare const ChatSessionSchema: import("mongoose").Schema<ChatSession, import("mongoose").Model<ChatSession, any, any, any, Document<unknown, any, ChatSession> & ChatSession & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ChatSession, Document<unknown, {}, import("mongoose").FlatRecord<ChatSession>> & import("mongoose").FlatRecord<ChatSession> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export {};
