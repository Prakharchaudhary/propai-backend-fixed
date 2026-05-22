import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { PropertiesService } from './properties.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

const imageUpload = FilesInterceptor('images', 10, {
  storage: memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req: any, file: any, cb: any) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  },
});

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  // ─── PUBLIC ROUTES ──────────────────────────────────────

  // GET /api/v1/properties
  @Get()
  findAll(@Query() filters: any) {
    return this.propertiesService.findAll(filters);
  }

  // GET /api/v1/properties/featured
  @Get('featured')
  getFeatured() {
    return this.propertiesService.getFeatured();
  }

  // GET /api/v1/properties/:slug
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.propertiesService.findBySlug(slug);
  }

  // ─── ADMIN ROUTES (JWT Protected) ───────────────────────

  // POST /api/v1/properties
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(imageUpload)
  create(@Body() body: any, @UploadedFiles() images: any[]) {
    return this.propertiesService.create(body, images);
  }

  // PUT /api/v1/properties/:id
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(imageUpload)
  update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFiles() images: any[],
  ) {
    return this.propertiesService.update(id, body, images);
  }

  // DELETE /api/v1/properties/:id/image/:publicId
  @UseGuards(JwtAuthGuard)
  @Delete(':id/image/:publicId')
  deleteImage(
    @Param('id') id: string,
    @Param('publicId') publicId: string,
  ) {
    return this.propertiesService.deleteImage(id, publicId);
  }

  // DELETE /api/v1/properties/:id
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.propertiesService.softDelete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/all')
  findAllAdmin(@Query() filters: any) {
  return this.propertiesService.findAllAdmin(filters);
}
}
