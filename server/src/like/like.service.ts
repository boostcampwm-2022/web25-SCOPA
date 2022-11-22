import { Injectable } from '@nestjs/common';

import { errors } from 'src/common/response/error-response';
import { UserInfo } from 'src/d';
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

  // Like Document 생성
  async create() {}

  // Like Document 에 좋아요 추가
  async addLike(likeDto: AddLikeRequestDto, userInfo: UserInfo) {
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

    // 좋아요 리스트에 추가하고자 하는 likedId 가 올바른 지 확인
    const likedUser = await this.userRepository.findUserById(likeDto.likedId);
    if (!likedUser) {
      throw errors.NOT_MATCHED_USER;
    }

    // User 의 ObjectId 로 Like Document 조회
    const like = await this.likeRepository.findLikeByUserId(user._id);
    const newLikedId = [...like.likedId, likeDto.likedId];

    // Like Document 에 likedId 필드에 likeDto 의 likedId 값을 추가(update);
    return await this.likeRepository.updateLikeByLikedId(user._id, newLikedId);
  }

  async deleteLike(likeDto: DeleteLikeRequestDto, userInfo: UserInfo) {
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

    // 좋아요 리스트에 삭제하고자 하는 likedId 가 올바른 지 확인
    const likedUser = await this.userRepository.findUserById(likeDto.likedId);
    if (!likedUser) {
      throw errors.NOT_MATCHED_USER;
    }

    // User 의 ObjectId 로 Like Document 조회
    const like = await this.likeRepository.findLikeByUserId(user._id);
    const newLikedId = like.likedId.filter((id) => id !== likeDto.likedId);

    // Like Document 에 likedId 필드에 likeDto 의 likedId 값을 추가(update);
    return await this.likeRepository.updateLikeByLikedId(user._id, newLikedId);
  }
}
