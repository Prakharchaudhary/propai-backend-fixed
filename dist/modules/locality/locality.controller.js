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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalityController = void 0;
const common_1 = require("@nestjs/common");
const locality_service_1 = require("./locality.service");
let LocalityController = class LocalityController {
    constructor(localityService) {
        this.localityService = localityService;
    }
    getNearby(lat, lng) {
        return this.localityService.getNearby(parseFloat(lat), parseFloat(lng));
    }
    getDistance(body) {
        return this.localityService.getDistance(body.propertyLat, body.propertyLng, body.destination);
    }
    geocode(body) {
        return this.localityService.geocode(body.address);
    }
    ask(body) {
        return this.localityService.askAboutLocality(body.question, body.propertyLat, body.propertyLng, body.propertyAddress);
    }
};
exports.LocalityController = LocalityController;
__decorate([
    (0, common_1.Get)('nearby'),
    __param(0, (0, common_1.Query)('lat')),
    __param(1, (0, common_1.Query)('lng')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LocalityController.prototype, "getNearby", null);
__decorate([
    (0, common_1.Post)('distance'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LocalityController.prototype, "getDistance", null);
__decorate([
    (0, common_1.Post)('geocode'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LocalityController.prototype, "geocode", null);
__decorate([
    (0, common_1.Post)('ask'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LocalityController.prototype, "ask", null);
exports.LocalityController = LocalityController = __decorate([
    (0, common_1.Controller)('locality'),
    __metadata("design:paramtypes", [locality_service_1.LocalityService])
], LocalityController);
//# sourceMappingURL=locality.controller.js.map