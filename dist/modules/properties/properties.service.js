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
exports.PropertiesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const property_schema_1 = require("./schemas/property.schema");
const media_service_1 = require("../media/media.service");
let PropertiesService = class PropertiesService {
    constructor(propertyModel, mediaService) {
        this.propertyModel = propertyModel;
        this.mediaService = mediaService;
    }
    generateSlug(title) {
        return (title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-') +
            '-' +
            Date.now());
    }
    async findAll(filters = {}) {
        const query = { status: 'active' };
        if (filters.city)
            query.city = new RegExp(filters.city, 'i');
        if (filters.propertyType)
            query.propertyType = filters.propertyType;
        if (filters.listingType)
            query.listingType = filters.listingType;
        if (filters.bedrooms)
            query.bedrooms = Number(filters.bedrooms);
        if (filters.configuration)
            query.configuration = filters.configuration;
        if (filters.maxPrice)
            query.price = { $lte: Number(filters.maxPrice) };
        if (filters.minPrice)
            query.price = { ...query.price, $gte: Number(filters.minPrice) };
        return this.propertyModel
            .find(query)
            .sort({ isFeatured: -1, createdAt: -1 })
            .exec();
    }
    async findBySlug(slug) {
        const property = await this.propertyModel.findOne({ slug }).exec();
        if (!property)
            throw new common_1.NotFoundException('Property not found');
        await this.propertyModel.findByIdAndUpdate(property._id, {
            $inc: { viewCount: 1 },
        });
        return property;
    }
    async findById(id) {
        return this.propertyModel.findById(id).exec();
    }
    async getFeatured() {
        return this.propertyModel
            .find({ isFeatured: true, status: 'active' })
            .limit(6)
            .exec();
    }
    async create(data, imageFiles, brochureFile) {
        const slug = this.generateSlug(data.title);
        let images = [];
        let brochureUrl = '';
        let brochurePublicId = '';
        if (imageFiles && imageFiles.length > 0) {
            const uploaded = await this.mediaService.uploadMultiple(imageFiles, 'propai/properties');
            images = uploaded.map((img, index) => ({
                url: img.url,
                publicId: img.publicId,
                isPrimary: index === 0,
            }));
        }
        if (brochureFile) {
            const uploaded = await this.mediaService.uploadImage(brochureFile, 'propai/brochures');
            brochureUrl = uploaded.url;
            brochurePublicId = uploaded.publicId;
        }
        let amenities = data.amenities;
        if (typeof amenities === 'string') {
            amenities = amenities.split(',').map((a) => a.trim());
        }
        const property = new this.propertyModel({
            ...data,
            slug,
            images,
            brochureUrl,
            brochurePublicId,
            amenities,
        });
        return property.save();
    }
    async update(id, data, imageFiles) {
        const property = await this.propertyModel.findById(id);
        if (!property)
            throw new common_1.NotFoundException('Property not found');
        let newImages = property.images || [];
        if (imageFiles && imageFiles.length > 0) {
            const uploaded = await this.mediaService.uploadMultiple(imageFiles, 'propai/properties');
            const more = uploaded.map((img, index) => ({
                url: img.url,
                publicId: img.publicId,
                isPrimary: newImages.length === 0 && index === 0,
            }));
            newImages = [...newImages, ...more];
        }
        let amenities = data.amenities;
        if (typeof amenities === 'string') {
            amenities = amenities.split(',').map((a) => a.trim());
        }
        return this.propertyModel
            .findByIdAndUpdate(id, { ...data, ...(amenities && { amenities }), images: newImages }, { new: true })
            .exec();
    }
    async deleteImage(propertyId, publicId) {
        const decoded = decodeURIComponent(publicId);
        await this.mediaService.deleteImage(decoded);
        return this.propertyModel.findByIdAndUpdate(propertyId, { $pull: { images: { publicId: decoded } } }, { new: true });
    }
    async softDelete(id) {
        return this.propertyModel
            .findByIdAndUpdate(id, { status: 'draft' }, { new: true })
            .exec();
    }
};
exports.PropertiesService = PropertiesService;
exports.PropertiesService = PropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(property_schema_1.Property.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        media_service_1.MediaService])
], PropertiesService);
//# sourceMappingURL=properties.service.js.map