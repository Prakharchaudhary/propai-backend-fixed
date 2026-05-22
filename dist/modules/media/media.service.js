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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
let MediaService = class MediaService {
    constructor() {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    async uploadImage(file, folder = 'propai/properties') {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader
                .upload_stream({
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
            }, (error, result) => {
                if (error)
                    return reject(error);
                resolve({
                    url: result.secure_url,
                    publicId: result.public_id,
                });
            })
                .end(file.buffer);
        });
    }
    async uploadMultiple(files, folder = 'propai/properties') {
        return Promise.all(files.map((f) => this.uploadImage(f, folder)));
    }
    async deleteImage(publicId) {
        await cloudinary_1.v2.uploader.destroy(publicId);
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MediaService);
//# sourceMappingURL=media.service.js.map