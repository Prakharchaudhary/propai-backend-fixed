import { LeadsService } from './leads.service';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    create(body: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/lead.schema").LeadDocument> & import("./schemas/lead.schema").Lead & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getStats(): Promise<{
        total: number;
        newLeads: number;
        converted: number;
        today: number;
    }>;
    findAll(filters: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/lead.schema").LeadDocument> & import("./schemas/lead.schema").Lead & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/lead.schema").LeadDocument> & import("./schemas/lead.schema").Lead & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateStatus(id: string, body: {
        status: string;
        notes?: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./schemas/lead.schema").LeadDocument> & import("./schemas/lead.schema").Lead & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, body: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/lead.schema").LeadDocument> & import("./schemas/lead.schema").Lead & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
