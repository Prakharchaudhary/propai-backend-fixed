export declare class LocalityService {
    private readonly mapsKey;
    getNearby(lat: number, lng: number): Promise<any>;
    getDistance(propertyLat: number, propertyLng: number, destination: string): Promise<{
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
    geocode(address: string): Promise<{
        lat: any;
        lng: any;
        formattedAddress: any;
    }>;
    askAboutLocality(question: string, propertyLat: number, propertyLng: number, propertyAddress: string): Promise<{
        answer: any;
        nearby: any;
    }>;
}
