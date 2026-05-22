import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

const fileUpload = (fieldName: string) =>
  FileInterceptor(fieldName, {
    storage: memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (_req: any, file: any, cb: any) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp|svg\+xml|x-icon)$/)) {
        return cb(new Error('Only image files allowed'), false);
      }
      cb(null, true);
    },
  });

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  // PUBLIC — Frontend yeh call karega
  // GET /api/v1/settings
  @Get()
  get() {
    return this.settingsService.get();
  }

  // ADMIN ROUTES (Protected)

  // PUT /api/v1/settings
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() body: any) {
    return this.settingsService.update(body);
  }

  // POST /api/v1/settings/logo
  @UseGuards(JwtAuthGuard)
  @Post('logo')
  @UseInterceptors(fileUpload('logo'))
  uploadLogo(@UploadedFile() file: any) {
    return this.settingsService.uploadLogo(file);
  }

  // POST /api/v1/settings/favicon
  @UseGuards(JwtAuthGuard)
  @Post('favicon')
  @UseInterceptors(fileUpload('favicon'))
  uploadFavicon(@UploadedFile() file: any) {
    return this.settingsService.uploadFavicon(file);
  }

  // POST /api/v1/settings/banners
  @UseGuards(JwtAuthGuard)
  @Post('banners')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  addBanner(@Body() body: any, @UploadedFile() file: any) {
    return this.settingsService.addBanner(body, file);
  }

  // DELETE /api/v1/settings/banners/:bannerId
  @UseGuards(JwtAuthGuard)
  @Delete('banners/:bannerId')
  deleteBanner(@Param('bannerId') bannerId: string) {
    return this.settingsService.deleteBanner(bannerId);
  }

  // PUT /api/v1/settings/banners/order
  @UseGuards(JwtAuthGuard)
  @Put('banners/order')
  updateBannerOrder(@Body() body: { banners: { id: string; order: number }[] }) {
    return this.settingsService.updateBannerOrder(body.banners);
  }
}