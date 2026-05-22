import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatSessionDocument = ChatSession & Document;

class Message {
  @Prop({ required: true, enum: ['user', 'assistant'] })
  role!: string;

  @Prop({ required: true })
  content!: string;

  @Prop({ default: Date.now })
  timestamp!: Date;
}

@Schema({ timestamps: true })
export class ChatSession {
  @Prop({ required: true, unique: true })
  sessionId!: string;

  @Prop({ type: [Message], default: [] })
  messages!: Message[];

  @Prop({ type: Object, default: {} })
  extractedIntent!: {
    propertyType?: string;
    configuration?: string;
    location?: string;
    budget?: { min?: number; max?: number };
    purpose?: string;
  };

  @Prop({ default: false })
  leadCaptured!: boolean;

  @Prop()
  leadId!: string;
}

export const ChatSessionSchema = SchemaFactory.createForClass(ChatSession);