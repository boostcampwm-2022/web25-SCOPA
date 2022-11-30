import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Like, LikeDocument } from './entities/like.entity';

@Injectable()
export class LikeRepository {
  constructor(@InjectModel(Like.name) private likeModel: Model<LikeDocument>) {}

  async findLikeByUserId(userId: string): Promise<Like> {
    return await this.likeModel.findOne().where('userId').equals(userId);
  }

  async updateLikeByLikedId(
    userId: string,
    likedIds: string[],
  ): Promise<object> {
    return await this.likeModel.updateOne({ userId }, { $set: { likedIds } });
  }

  async createLike(userId: string, likedIds = []): Promise<Like> {
    return await this.likeModel.create({ userId, likedIds });
  }
}
