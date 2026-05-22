import { LocalityService } from './locality.service';
export declare class LocalityController {
    private readonly localityService;
    constructor(localityService: LocalityService);
    getNearby(lat: string, lng: string): Promise<any>;
    getDistance(body: {
        propertyLat: number;
        propertyLng: number;
        destination: string;
    }): Promise<{
        error: string;
        distance?: undefined;
        duration?: undefined;
        destination?: undefined;
    } | {
        distance: any;
        duration: any;
        destination: any;
        error?: undefined;
    }>;
    geocode(body: {
        address: string;
    }): Promise<{
        lat: any;
        lng: any;
        formattedAddress: any;
    }>;
    ask(body: {
        question: string;
        propertyLat: number;
        propertyLng: number;
        propertyAddress: string;
    }): Promise<{
        answer: any;
        nearby: any;
    }>;
}
