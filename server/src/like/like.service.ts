import { Injectable } from '@nestjs/common';
import { UserInfo } from 'src/d';
import { UserRepository } from 'src/user/user.repository';
import { AddLikeRequestDto } from './dto/add-like.dto';
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
    // 세션에 있는 정보로 User 의 ObjectId 조회
    const { authProvider, authId } = { ...userInfo };
    const user = await this.userRepository.findUserByAuthProviderAndAuthId(
      authProvider,
      authId,
    );

    console.log(user);

    // User 의 ObjectId 로 Like Document 조회
    const like = await this.likeRepository.findLikeByUserId(user._id);

    // Like Document 에 likedId 필드에 likeDto 의 likedId 값을 추가
  }
}
