import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Like } from './entities/like.entity';

@Injectable()
export class LikeRepository {
  constructor(@InjectModel(Like.name) private likeModel: Model<Like>) {}
}
