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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const settings_schema_1 = require("./schemas/settings.schema");
const media_service_1 = require("../media/media.service");
const FIELD_DEFAULTS = {
    accentColor: '#2563eb',
    bgColor: '#f8fafc',
    cardColor: '#ffffff',
    bannerInterval: 5000,
};
let SettingsService = class SettingsService {
    constructor(settingsModel, mediaService) {
        this.settingsModel = settingsModel;
        this.mediaService = mediaService;
    }
    async get() {
        let settings = await this.settingsModel.findOne().exec();
        if (!settings) {
            settings = new this.settingsModel({});
            await settings.save();
            return settings;
        }
        const patch = {};
        for (const [key, val] of Object.entries(FIELD_DEFAULTS)) {
            if (settings[key] === undefined || settings[key] === null) {
                patch[key] = val;
            }
        }
        if (Object.keys(patch).length > 0) {
            await this.settingsModel.findByIdAndUpdate(settings._id, { $set: patch }).exec();
            return { ...settings.toObject(), ...patch };
        }
        return settings;
    }
    async update(data) {
        let settings = await this.settingsModel.findOne().exec();
        if (!settings) {
            settings = new this.settingsModel(data);
            return settings.save();
        }
        return this.settingsModel
            .findByIdAndUpdate(settings._id, { $set: data }, { new: true })
            .exec();
    }
    async uploadLogo(file) {
        const settings = await this.settingsModel.findOne().exec();
        if (settings?.logo?.publicId) {
            await this.mediaService.deleteImage(settings.logo.publicId).catch(() => { });
        }
        const uploaded = await this.mediaService.uploadImage(file, 'propai/branding');
        return this.update({ logo: uploaded });
    }
    async uploadFavicon(file) {
        const settings = await this.settingsModel.findOne().exec();
        if (settings?.favicon?.publicId) {
            await this.mediaService.deleteImage(settings.favicon.publicId).catch(() => { });
        }
        const uploaded = await this.mediaService.uploadImage(file, 'propai/branding');
        return this.update({ favicon: uploaded });
    }
    async addBanner(data, file) {
        let imageData = { url: '', publicId: '' };
        if ((!data.mediaType || data.mediaType === 'image') && file) {
            const uploaded = await this.mediaService.uploadImage(file, 'propai/banners');
            imageData = { url: uploaded.url, publicId: uploaded.publicId };
        }
        const banner = {
            image: imageData,
            videoUrl: data.videoUrl || '',
            mediaType: data.mediaType || 'image',
            title: data.title || '',
            subtitle: data.subtitle || '',
            badge: data.badge || '',
            ctaText: data.ctaText || 'Explore Now',
            ctaLink: data.ctaLink || '/properties',
            ctaSecondaryText: data.ctaSecondaryText || '',
            ctaSecondaryLink: data.ctaSecondaryLink || '',
            overlayOpacity: Number(data.overlayOpacity) || 50,
            isActive: true,
            order: Number(data.order) || 0,
        };
        return this.settingsModel.findOneAndUpdate({}, { $push: { banners: banner } }, { new: true, upsert: true });
    }
    async deleteBanner(bannerId) {
        const settings = await this.settingsModel.findOne();
        if (!settings) {
            throw new Error('Settings not found');
        }
        settings.banners = settings.banners.filter((banner) => {
            return banner?._id?.toString() !== bannerId;
        });
        await settings.save();
        return settings;
    }
    async updateBannerOrder(banners) {
        const settings = await this.settingsModel.findOne().exec();
        if (!settings)
            return null;
        for (const b of banners) {
            if (!b.id || b.id === 'undefined')
                continue;
            await this.settingsModel.updateOne({ 'banners._id': b.id }, { $set: { 'banners.$.order': b.order } });
        }
        return this.settingsModel.findOne().exec();
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(settings_schema_1.Settings.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        media_service_1.MediaService])
], SettingsService);
//# sourceMappingURL=settings.service.js.map