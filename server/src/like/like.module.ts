import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { LikeRepository } from './like.repository';
import { Like, likeSchema } from './entities/like.entity';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: likeSchema }]),
  ],
  controllers: [LikeController],
  providers: [
    LikeService,
    LikeRepository,
    {
      provide: UserService,
      useValue: {},
    },
    {
      provide: UserRepository,
      useValue: {},
    },
  ],
})
export class LikeModule {}
