export declare class NotificationService {
    private readonly logger;
    private getTransporter;
    sendEmail(to: string, subject: string, html: string): Promise<void>;
    sendWhatsApp(phone: string, message: string): Promise<void>;
    notifyNewLead(lead: any): Promise<void>;
}
