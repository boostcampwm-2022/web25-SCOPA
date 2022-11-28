import { Injectable } from '@nestjs/common';

import { errors } from 'src/common/response/error-response';
import { UserRepository } from 'src/user/user.repository';
import { AddLikeRequestDto } from './dto/add-like.dto';
import { DeleteLikeRequestDto } from './dto/delete-like.dto';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly userRepository: UserRepository,
  ) {}

  // Like Document 에 좋아요 추가
  async addLike(likeDto: AddLikeRequestDto, userId: string) {
    await this.checkUserId(userId);
    await this.checkUserId(likeDto.likedId);

    // User 의 ObjectId 로 Like Document 조회
    const like = await this.likeRepository.findLikeByUserId(userId);
    const newLikedId = [...like.likedIds, likeDto.likedId];

    // Like Document 에 likedId 필드에 likeDto 의 likedId 값을 추가(update);
    return await this.likeRepository.updateLikeByLikedIds(userId, newLikedId);
  }

  async deleteLike(likeDto: DeleteLikeRequestDto, userId: string) {
    await this.checkUserId(userId);
    await this.checkUserId(likeDto.likedId);

    // User 의 ObjectId 로 Like Document 조회
    const like = await this.likeRepository.findLikeByUserId(userId);
    const newLikedId = like.likedIds.filter((id) => id !== likeDto.likedId);

    // Like Document 에 likedId 필드에 likeDto 의 likedId 값을 추가(update);
    return await this.likeRepository.updateLikeByLikedIds(userId, newLikedId);
  }

  async checkUserId(id: string): Promise<void> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw errors.NOT_MATCHED_USER;
    }
  }
}
