import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

export interface UploadResult {
  url: string;
  publicId: string;
}

@Injectable()
export class MediaService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(
    file: { buffer: Buffer; originalname: string },
    folder = 'propai/properties',
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            transformation: [
              {
                width: 1200,
                height: 800,
                crop: 'fill',
                quality: 'auto',
                fetch_format: 'auto',
              },
            ],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve({
              url: result!.secure_url,
              publicId: result!.public_id,
            });
          },
        )
        .end(file.buffer);
    });
  }

  async uploadMultiple(
    files: { buffer: Buffer; originalname: string }[],
    folder = 'propai/properties',
  ): Promise<UploadResult[]> {
    return Promise.all(files.map((f) => this.uploadImage(f, folder)));
  }

  async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }
}
