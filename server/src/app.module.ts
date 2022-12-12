import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LikeModule } from './like/like.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      dbName: process.env.DB_NAME,
    }),
    AuthModule,
    UserModule,
    LikeModule,
    MessageModule,
  ],
})
export class AppModule {}
