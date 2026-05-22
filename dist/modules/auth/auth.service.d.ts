import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './schemas/user.schema';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    register(name: string, email: string, password: string): Promise<{
        message: string;
    }>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        user: {
            id: any;
            name: string;
            email: string;
            role: string;
        };
    }>;
    getProfile(userId: string): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
