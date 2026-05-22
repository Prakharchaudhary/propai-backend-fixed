import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    chat(body: {
        sessionId: string;
        message: string;
        propertyContext?: {
            lat?: number;
            lng?: number;
            address?: string;
            title?: string;
        };
    }): Promise<{
        reply: string;
        sessionId: string;
        leadCaptured: boolean;
        properties: (import("mongoose").FlattenMaps<import("../properties/schemas/property.schema").PropertyDocument> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getSession(sessionId: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/chat-session.schema").ChatSessionDocument> & import("./schemas/chat-session.schema").ChatSession & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
