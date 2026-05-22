import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property, PropertyDocument } from './schemas/property.schema';
import { MediaService } from '../media/media.service';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name)
    private propertyModel: Model<PropertyDocument>,
    private mediaService: MediaService,
  ) {}

  private generateSlug(title: string): string {
    return (
      title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-') +
      '-' +
      Date.now()
    );
  }

  async findAll(filters: any = {}) {
    const query: any = { status: 'active' };
    if (filters.city) query.city = new RegExp(filters.city, 'i');
    if (filters.propertyType) query.propertyType = filters.propertyType;
    if (filters.listingType) query.listingType = filters.listingType;
    if (filters.bedrooms) query.bedrooms = Number(filters.bedrooms);
    if (filters.configuration) query.configuration = filters.configuration;
    if (filters.maxPrice) query.price = { $lte: Number(filters.maxPrice) };
    if (filters.minPrice)
      query.price = { ...query.price, $gte: Number(filters.minPrice) };

    return this.propertyModel
      .find(query)
      .sort({ isFeatured: -1, createdAt: -1 })
      .exec();
  }

  async findBySlug(slug: string) {
    const property = await this.propertyModel.findOne({ slug }).exec();
    if (!property) throw new NotFoundException('Property not found');
    await this.propertyModel.findByIdAndUpdate(property._id, {
      $inc: { viewCount: 1 },
    });
    return property;
  }

  async findById(id: string) {
    return this.propertyModel.findById(id).exec();
  }

  async getFeatured() {
    return this.propertyModel
      .find({ isFeatured: true, status: 'active' })
      .limit(6)
      .exec();
  }

  async create(data: any, imageFiles?: any[], brochureFile?: any) {
    const slug = this.generateSlug(data.title);

    let images: { url: string; publicId: string; isPrimary: boolean }[] = [];
    let brochureUrl = '';
    let brochurePublicId = '';

    if (imageFiles && imageFiles.length > 0) {
      const uploaded = await this.mediaService.uploadMultiple(
        imageFiles,
        'propai/properties',
      );
      images = uploaded.map((img, index) => ({
        url: img.url,
        publicId: img.publicId,
        isPrimary: index === 0,
      }));
    }

    if (brochureFile) {
      const uploaded = await this.mediaService.uploadImage(
        brochureFile,
        'propai/brochures',
      );
      brochureUrl = uploaded.url;
      brochurePublicId = uploaded.publicId;
    }

    let amenities = data.amenities;
    if (typeof amenities === 'string') {
      amenities = amenities.split(',').map((a: string) => a.trim());
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

  async update(id: string, data: any, imageFiles?: any[]) {
    const property = await this.propertyModel.findById(id);
    if (!property) throw new NotFoundException('Property not found');

    let newImages = property.images || [];

    if (imageFiles && imageFiles.length > 0) {
      const uploaded = await this.mediaService.uploadMultiple(
        imageFiles,
        'propai/properties',
      );
      const more = uploaded.map((img, index) => ({
        url: img.url,
        publicId: img.publicId,
        isPrimary: newImages.length === 0 && index === 0,
      }));
      newImages = [...newImages, ...more];
    }

    let amenities = data.amenities;
    if (typeof amenities === 'string') {
      amenities = amenities.split(',').map((a: string) => a.trim());
    }

    return this.propertyModel
      .findByIdAndUpdate(
        id,
        { ...data, ...(amenities && { amenities }), images: newImages },
        { new: true },
      )
      .exec();
  }

  async deleteImage(propertyId: string, publicId: string) {
    // Decode publicId (URL encoded from param)
    const decoded = decodeURIComponent(publicId);
    await this.mediaService.deleteImage(decoded);
    return this.propertyModel.findByIdAndUpdate(
      propertyId,
      { $pull: { images: { publicId: decoded } } },
      { new: true },
    );
  }

  async softDelete(id: string) {
    return this.propertyModel
      .findByIdAndUpdate(id, { status: 'draft' }, { new: true })
      .exec();
  }
}
