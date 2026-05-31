import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings, SettingsDocument } from './schemas/settings.schema';
import { MediaService } from '../media/media.service';

const FIELD_DEFAULTS: Record<string, any> = {
  accentColor: '#2563eb',
  bgColor:     '#f8fafc',
  cardColor:   '#ffffff',
  bannerInterval: 5000,
};

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name)
    private settingsModel: Model<SettingsDocument>,
    private mediaService: MediaService,
  ) {}

  async get() {
    let settings = await this.settingsModel.findOne().exec();
    if (!settings) {
      settings = new this.settingsModel({});
      await settings.save();
      return settings;
    }

    const patch: Record<string, any> = {};
    for (const [key, val] of Object.entries(FIELD_DEFAULTS)) {
      if ((settings as any)[key] === undefined || (settings as any)[key] === null) {
        patch[key] = val;
      }
    }
    if (Object.keys(patch).length > 0) {
      await this.settingsModel.findByIdAndUpdate(settings._id, { $set: patch }).exec();
      return { ...settings.toObject(), ...patch };
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

  async uploadLogo(file: any) {
    const settings = await this.settingsModel.findOne().exec();
    if (settings?.logo?.publicId) {
      await this.mediaService.deleteImage(settings.logo.publicId).catch(() => {});
    }
    const uploaded = await this.mediaService.uploadImage(file, 'propai/branding');
    return this.update({ logo: uploaded });
  }

  async uploadFavicon(file: any) {
    const settings = await this.settingsModel.findOne().exec();
    if (settings?.favicon?.publicId) {
      await this.mediaService.deleteImage(settings.favicon.publicId).catch(() => {});
    }
    const uploaded = await this.mediaService.uploadImage(file, 'propai/branding');
    return this.update({ favicon: uploaded });
  }

  async addBanner(data: any, file?: any) {
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

    return this.settingsModel.findOneAndUpdate(
      {},
      { $push: { banners: banner } },
      { new: true, upsert: true },
    );
  }

async deleteBanner(bannerId: string) {
  const settings = await this.settingsModel.findOne();

  if (!settings) {
    throw new Error('Settings not found');
  }

  settings.banners = settings.banners.filter((banner: any) => {
    return banner?._id?.toString() !== bannerId;
  }) as any;

  await settings.save();

  return settings;
}
  async updateBannerOrder(banners: { id: string; order: number }[]) {
    const settings = await this.settingsModel.findOne().exec();
    if (!settings) return null;
    for (const b of banners) {
      if (!b.id || b.id === 'undefined') continue;
      await this.settingsModel.updateOne(
        { 'banners._id': b.id },
        { $set: { 'banners.$.order': b.order } },
      );
    }
    return this.settingsModel.findOne().exec();
  }
}