import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { LeadsModule } from './modules/leads/leads.module';
import { MediaModule } from './modules/media/media.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ChatModule } from './modules/chat/chat.module';               // 👈 ADD
import { NotificationsModule } from './modules/notifications/notifications.module'; // 👈 ADD
import { LocalityModule } from './modules/locality/locality.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
        dbName: 'propai',
      }),
    }),
    AuthModule,
    PropertiesModule,
    LeadsModule,
    MediaModule,
    SettingsModule,
    ChatModule,
    NotificationsModule,
    LocalityModule,

  ],
})
export class AppModule {}
