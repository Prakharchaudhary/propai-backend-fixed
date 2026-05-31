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
exports.SettingsSchema = exports.Settings = void 0;
const mongoose_1 = require("@nestjs/mongoose");
class Media {
}
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Media.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Media.prototype, "publicId", void 0);
let Banner = class Banner {
};
__decorate([
    (0, mongoose_1.Prop)({ type: Media, default: {} }),
    __metadata("design:type", Media)
], Banner.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Banner.prototype, "videoUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'image' }),
    __metadata("design:type", String)
], Banner.prototype, "mediaType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Banner.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Banner.prototype, "subtitle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Banner.prototype, "badge", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Banner.prototype, "ctaText", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Banner.prototype, "ctaLink", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Banner.prototype, "ctaSecondaryText", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Banner.prototype, "ctaSecondaryLink", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 50 }),
    __metadata("design:type", Number)
], Banner.prototype, "overlayOpacity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Banner.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Banner.prototype, "order", void 0);
Banner = __decorate([
    (0, mongoose_1.Schema)({ _id: true })
], Banner);
class Contact {
}
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Contact.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Contact.prototype, "whatsapp", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Contact.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Contact.prototype, "address", void 0);
class Social {
}
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Social.prototype, "facebook", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Social.prototype, "instagram", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Social.prototype, "youtube", void 0);
class SEO {
}
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], SEO.prototype, "metaTitle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], SEO.prototype, "metaDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], SEO.prototype, "googleAnalyticsId", void 0);
let Settings = class Settings {
};
exports.Settings = Settings;
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Settings.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'PropAI Realty' }),
    __metadata("design:type", String)
], Settings.prototype, "dealerName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'Your Dream Home Awaits' }),
    __metadata("design:type", String)
], Settings.prototype, "tagline", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Media, default: {} }),
    __metadata("design:type", Media)
], Settings.prototype, "logo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Media, default: {} }),
    __metadata("design:type", Media)
], Settings.prototype, "favicon", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '#f8fafc' }),
    __metadata("design:type", String)
], Settings.prototype, "bgColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '#2563eb' }),
    __metadata("design:type", String)
], Settings.prototype, "accentColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '#ffffff' }),
    __metadata("design:type", String)
], Settings.prototype, "cardColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '#1a2f5a' }),
    __metadata("design:type", String)
], Settings.prototype, "primaryColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '#2563eb' }),
    __metadata("design:type", String)
], Settings.prototype, "secondaryColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Banner], default: [] }),
    __metadata("design:type", Array)
], Settings.prototype, "banners", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 5000 }),
    __metadata("design:type", Number)
], Settings.prototype, "bannerInterval", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Contact, default: {} }),
    __metadata("design:type", Contact)
], Settings.prototype, "contact", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Social, default: {} }),
    __metadata("design:type", Social)
], Settings.prototype, "social", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: SEO, default: {} }),
    __metadata("design:type", SEO)
], Settings.prototype, "seo", void 0);
exports.Settings = Settings = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Settings);
exports.SettingsSchema = mongoose_1.SchemaFactory.createForClass(Settings);
//# sourceMappingURL=settings.schema.js.map