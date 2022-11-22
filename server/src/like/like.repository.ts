import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Like } from './entities/like.entity';

@Injectable()
export class LikeRepository {
  constructor(@InjectModel(Like.name) private likeModel: Model<Like>) {}

  async findLikeByUserId(userId: string) {
    return await this.likeModel.findOne().where('userId').equals(userId);
  }

  async updateLikeByLikedId(userId: string, likedId: string[]) {
    return await this.likeModel.updateOne({ userId }, { $set: { likedId } });
  }
}
