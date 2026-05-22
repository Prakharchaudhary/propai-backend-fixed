import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead, LeadDocument } from './schemas/lead.schema';
import { NotificationService } from '../notifications/notification.service';

@Injectable()
export class LeadsService {
  constructor(
    @InjectModel(Lead.name)
    private leadModel: Model<LeadDocument>,
    private notificationService: NotificationService,
  ) {}

  async create(data: any) {
    // Duplicate check — same phone in last 30 days
    const existing = await this.leadModel.findOne({
      phone: data.phone,
      createdAt: {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    });

    if (existing) {
      return this.leadModel.findByIdAndUpdate(
        existing._id,
        { message: data.message, updatedAt: new Date() },
        { new: true },
      );
    }

    const lead = new this.leadModel(data);
    const saved = await lead.save();

    // Fire-and-forget — don't block response
    this.notificationService.notifyNewLead(saved).catch(() => {});

    return saved;
  }

  async findAll(filters: any = {}) {
    const query: any = {};
    if (filters.status) query.status = filters.status;
    if (filters.source) query.source = filters.source;
    if (filters.priority) query.priority = filters.priority;

    return this.leadModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string) {
    return this.leadModel.findById(id).exec();
  }

  async updateStatus(id: string, status: string, notes?: string) {
    return this.leadModel.findByIdAndUpdate(
      id,
      { status, ...(notes && { notes }) },
      { new: true },
    );
  }

  async update(id: string, data: any) {
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
}