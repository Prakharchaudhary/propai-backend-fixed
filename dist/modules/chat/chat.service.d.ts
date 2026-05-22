import { Model } from 'mongoose';
import { ChatSession, ChatSessionDocument } from './schemas/chat-session.schema';
import { PropertyDocument } from '../properties/schemas/property.schema';
import { LeadDocument } from '../leads/schemas/lead.schema';
import { NotificationService } from '../notifications/notification.service';
export declare class ChatService {
    private chatModel;
    private propertyModel;
    private leadModel;
    private notificationService;
    constructor(chatModel: Model<ChatSessionDocument>, propertyModel: Model<PropertyDocument>, leadModel: Model<LeadDocument>, notificationService: NotificationService);
    chat(sessionId: string, userMessage: string, propertyContext?: {
        lat?: number;
        lng?: number;
        address?: string;
        title?: string;
    }): Promise<{
        reply: string;
        sessionId: string;
        leadCaptured: boolean;
        properties: (import("mongoose").FlattenMaps<PropertyDocument> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getSession(sessionId: string): Promise<import("mongoose").Document<unknown, {}, ChatSessionDocument> & ChatSession & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
