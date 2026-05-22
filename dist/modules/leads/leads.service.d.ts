import { Model } from 'mongoose';
import { Lead, LeadDocument } from './schemas/lead.schema';
import { NotificationService } from '../notifications/notification.service';
export declare class LeadsService {
    private leadModel;
    private notificationService;
    constructor(leadModel: Model<LeadDocument>, notificationService: NotificationService);
    create(data: any): Promise<import("mongoose").Document<unknown, {}, LeadDocument> & Lead & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(filters?: any): Promise<(import("mongoose").Document<unknown, {}, LeadDocument> & Lead & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, LeadDocument> & Lead & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateStatus(id: string, status: string, notes?: string): Promise<import("mongoose").Document<unknown, {}, LeadDocument> & Lead & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, data: any): Promise<import("mongoose").Document<unknown, {}, LeadDocument> & Lead & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getStats(): Promise<{
        total: number;
        newLeads: number;
        converted: number;
        today: number;
    }>;
}
