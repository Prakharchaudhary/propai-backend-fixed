export interface UploadResult {
    url: string;
    publicId: string;
}
export declare class MediaService {
    constructor();
    uploadImage(file: {
        buffer: Buffer;
        originalname: string;
    }, folder?: string): Promise<UploadResult>;
    uploadMultiple(files: {
        buffer: Buffer;
        originalname: string;
    }[], folder?: string): Promise<UploadResult[]>;
    deleteImage(publicId: string): Promise<void>;
}
