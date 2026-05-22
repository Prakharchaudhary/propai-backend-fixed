import { MediaService } from './media.service';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    upload(files: any[]): Promise<{
        success: boolean;
        data: import("./media.service").UploadResult[];
    }>;
}
