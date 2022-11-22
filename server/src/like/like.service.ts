import { Injectable } from '@nestjs/common';

import { errors } from 'src/common/response/error-response';
import { UserInfo } from 'src/d';
import { User } from 'src/user/entities/user.entity';
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
  async addLike(likeDto: AddLikeRequestDto, userInfo: UserInfo) {
    const user = await this.checkUserExistByUserInfo(userInfo);
    const likedUser = await this.checkUserExistById(likeDto.likedId);

    // User 의 ObjectId 로 Like Document 조회
    const like = await this.likeRepository.findLikeByUserId(user._id);
    const newLikedId = [...like.likedId, likeDto.likedId];

    // Like Document 에 likedId 필드에 likeDto 의 likedId 값을 추가(update);
    return await this.likeRepository.updateLikeByLikedId(user._id, newLikedId);
  }

  async deleteLike(likeDto: DeleteLikeRequestDto, userInfo: UserInfo) {
    const user = await this.checkUserExistByUserInfo(userInfo);
    const likedUser = await this.checkUserExistById(likeDto.likedId);

    // User 의 ObjectId 로 Like Document 조회
    const like = await this.likeRepository.findLikeByUserId(user._id);
    const newLikedId = like.likedId.filter((id) => id !== likeDto.likedId);

    // Like Document 에 likedId 필드에 likeDto 의 likedId 값을 추가(update);
    return await this.likeRepository.updateLikeByLikedId(user._id, newLikedId);
  }

  async checkUserExistByUserInfo(userInfo: UserInfo): Promise<User> {
    // 세션에 있는 사용자 정보로 User 의 ObjectId 조회
    const { authProvider, authId } = { ...userInfo };
    const user = await this.userRepository.findUserByAuthProviderAndAuthId(
      authProvider,
      authId,
    );

    // 조회된 user 가 없다면, 에러 반환
    if (!user) {
      throw errors.NOT_MATCHED_USER;
    }

    return user;
  }

  async checkUserExistById(id: string): Promise<User> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw errors.NOT_MATCHED_USER;
    }

    return user;
  }
}
