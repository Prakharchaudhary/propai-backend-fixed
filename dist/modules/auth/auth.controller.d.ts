import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
        user: {
            id: any;
            name: string;
            email: string;
            role: string;
        };
    }>;
    getProfile(req: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").UserDocument> & import("./schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
