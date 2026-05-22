"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const lead_schema_1 = require("./schemas/lead.schema");
const notification_service_1 = require("../notifications/notification.service");
let LeadsService = class LeadsService {
    constructor(leadModel, notificationService) {
        this.leadModel = leadModel;
        this.notificationService = notificationService;
    }
    async create(data) {
        const existing = await this.leadModel.findOne({
            phone: data.phone,
            createdAt: {
                $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            },
        });
        if (existing) {
            return this.leadModel.findByIdAndUpdate(existing._id, { message: data.message, updatedAt: new Date() }, { new: true });
        }
        const lead = new this.leadModel(data);
        const saved = await lead.save();
        this.notificationService.notifyNewLead(saved).catch(() => { });
        return saved;
    }
    async findAll(filters = {}) {
        const query = {};
        if (filters.status)
            query.status = filters.status;
        if (filters.source)
            query.source = filters.source;
        if (filters.priority)
            query.priority = filters.priority;
        return this.leadModel.find(query).sort({ createdAt: -1 }).exec();
    }
    async findById(id) {
        return this.leadModel.findById(id).exec();
    }
    async updateStatus(id, status, notes) {
        return this.leadModel.findByIdAndUpdate(id, { status, ...(notes && { notes }) }, { new: true });
    }
    async update(id, data) {
        return this.leadModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async getStats() {
        const [total, newLeads, converted, today] = await Promise.all([
            this.leadModel.countDocuments(),
            this.leadModel.countDocuments({ status: 'new' }),
            this.leadModel.countDocuments({ status: 'converted' }),
            this.leadModel.countDocuments({
                createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
            }),
        ]);
        return { total, newLeads, converted, today };
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(lead_schema_1.Lead.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        notification_service_1.NotificationService])
], LeadsService);
//# sourceMappingURL=leads.service.js.map