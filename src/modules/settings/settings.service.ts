import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings, SettingsDocument } from './schemas/settings.schema';
import { MediaService } from '../media/media.service';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name)
    private settingsModel: Model<SettingsDocument>,
    private mediaService: MediaService,
  ) {}

  // Hamesha ek hi settings document rahega
  async get() {
    let settings = await this.settingsModel.findOne().exec();
    if (!settings) {
      // Pehli baar — default settings bana do
      settings = new this.settingsModel({});
      await settings.save();
    }
    return settings;
  }

  async update(data: any) {
    let settings = await this.settingsModel.findOne().exec();
    if (!settings) {
      settings = new this.settingsModel(data);
      return settings.save();
    }
    return this.settingsModel
      .findByIdAndUpdate(settings._id, { $set: data }, { new: true })
      .exec();
  }

  // Logo upload
  async uploadLogo(file: any) {
    const settings = await this.settingsModel.findOne().exec();

    // Purana logo delete karo Cloudinary se
    if (settings?.logo?.publicId) {
      await this.mediaService.deleteImage(settings.logo.publicId);
    }

    const uploaded = await this.mediaService.uploadImage(
      file,
      'propai/branding',
    );

    return this.update({ logo: uploaded });
  }

  // Favicon upload
  async uploadFavicon(file: any) {
    const settings = await this.settingsModel.findOne().exec();

    if (settings?.favicon?.publicId) {
      await this.mediaService.deleteImage(settings.favicon.publicId);
    }

    const uploaded = await this.mediaService.uploadImage(
      file,
      'propai/branding',
    );

    return this.update({ favicon: uploaded });
  }

  // Banner add karo
  async addBanner(data: any, file: any) {
    const uploaded = await this.mediaService.uploadImage(
      file,
      'propai/banners',
    );

    const banner = {
      image: uploaded,
      title: data.title || '',
      subtitle: data.subtitle || '',
      ctaText: data.ctaText || 'Explore Now',
      ctaLink: data.ctaLink || '/properties',
      isActive: true,
      order: Number(data.order) || 0,
    };

    return this.settingsModel.findOneAndUpdate(
      {},
      { $push: { banners: banner } },
      { new: true, upsert: true },
    );
  }

  // Banner delete karo
  async deleteBanner(bannerId: string) {
    const settings = await this.settingsModel.findOne().exec();
    const banner = settings?.banners?.find(
      (b: any) => b._id.toString() === bannerId,
    );

    // Cloudinary se bhi delete karo
    if (banner?.image?.publicId) {
      await this.mediaService.deleteImage(banner.image.publicId);
    }

    return this.settingsModel.findOneAndUpdate(
      {},
      { $pull: { banners: { _id: bannerId } } },
      { new: true },
    );
  }

  // Banner order update
  async updateBannerOrder(banners: { id: string; order: number }[]) {
    const settings = await this.settingsModel.findOne().exec();
    if (!settings) return null;

    for (const b of banners) {
      await this.settingsModel.updateOne(
        { 'banners._id': b.id },
        { $set: { 'banners.$.order': b.order } },
      );
    }

    return this.settingsModel.findOne().exec();
  }
}