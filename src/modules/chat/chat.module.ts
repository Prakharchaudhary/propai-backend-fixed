import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatSession, ChatSessionSchema } from './schemas/chat-session.schema';
import { Property, PropertySchema } from '../properties/schemas/property.schema';
import { Lead, LeadSchema } from '../leads/schemas/lead.schema';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChatSession.name, schema: ChatSessionSchema },
      { name: Property.name, schema: PropertySchema },
      { name: Lead.name, schema: LeadSchema },
    ]),
    NotificationsModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}