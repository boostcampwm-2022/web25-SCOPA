import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { LikeRepository } from './like.repository';
import { Like, likeSchema } from './entities/like.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: likeSchema }]),
  ],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository],
})
export class LikeModule {}
