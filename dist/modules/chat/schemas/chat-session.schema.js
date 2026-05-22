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
exports.ChatSessionSchema = exports.ChatSession = void 0;
const mongoose_1 = require("@nestjs/mongoose");
class Message {
}
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['user', 'assistant'] }),
    __metadata("design:type", String)
], Message.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Message.prototype, "timestamp", void 0);
let ChatSession = class ChatSession {
};
exports.ChatSession = ChatSession;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], ChatSession.prototype, "sessionId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Message], default: [] }),
    __metadata("design:type", Array)
], ChatSession.prototype, "messages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], ChatSession.prototype, "extractedIntent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], ChatSession.prototype, "leadCaptured", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ChatSession.prototype, "leadId", void 0);
exports.ChatSession = ChatSession = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ChatSession);
exports.ChatSessionSchema = mongoose_1.SchemaFactory.createForClass(ChatSession);
//# sourceMappingURL=chat-session.schema.js.map