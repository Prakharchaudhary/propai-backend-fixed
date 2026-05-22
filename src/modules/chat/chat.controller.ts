import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  chat(
    @Body()
    body: {
      sessionId: string;
      message: string;
      propertyContext?: {
        lat?: number;
        lng?: number;
        address?: string;
        title?: string;
      };
    },
  ) {
    return this.chatService.chat(
      body.sessionId,
      body.message,
      body.propertyContext,
    );
  }

  @Get(':sessionId')
  getSession(@Param('sessionId') sessionId: string) {
    return this.chatService.getSession(sessionId);
  }
}