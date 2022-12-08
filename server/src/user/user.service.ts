import { Injectable } from '@nestjs/common';

import { AuthInfo, SessionInfo } from 'src/common/d';
import { MessageWith, User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { errors } from 'src/common/response/index';
import { CreateUserRequest } from './dto/create-user.dto';
import { LikeRepository } from './../like/like.repository';
import { UpdateUserRequest } from './dto/update-user.dto';
import { FindUserRequest } from './dto/find-user.dto';
import { PageUserResponse } from './dto/page-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly likeRepository: LikeRepository,
  ) {}
  private readonly PAGE_LIMIT = 6;

  // 유저 생성
  async createUser(
    userDto: CreateUserRequest,
    authInfo: AuthInfo,
  ): Promise<User> {
    // 유효성 검사
    this.validateUsername(userDto.username);
    // 중복 검사
    await this.checkDuplicatedUsername(userDto.username);
    const user = userDto.toEntity(authInfo);
    const createdUser = await this.userRepository.create(user);

    await this.likeRepository.create(createdUser._id.toString());

    return createdUser;
  }

  async findAll(
    findUserRequest: FindUserRequest,
    userId: undefined | string,
  ): Promise<PageUserResponse> {
    let likedIds: Array<string> | undefined = undefined;
    // 로그인을 했으면 해당 유저가 좋아요한 목록을 조회한다.
    if (userId !== undefined) {
      likedIds = (await this.likeRepository.findByUserId(userId)).likedIds;
    }
    const condition = findUserRequest.getCondition(likedIds);
    const pageable = findUserRequest.getPageable(this.PAGE_LIMIT);
    const pageReulst = await this.userRepository.findAll(condition, pageable);
    return new PageUserResponse(pageReulst, likedIds, findUserRequest.liked);
  }

  async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw errors.NOT_MATCHED_USER;
    }
    return user;
  }

  async findUserByAuth(authProvider: string, authId: string): Promise<User> {
    return await this.userRepository.findByAuthProviderAndAuthId(
      authProvider,
      authId,
    );
  }

  // 유저 삭제
  async remove(userId: string): Promise<object> {
    await this.findUserById(userId);
    // 일치 -> 유저 정보 삭제 -> 결과 반환
    return this.userRepository.deleteById(userId);
  }

  async updateUser(
    sessionInfo: SessionInfo,
    updateUserRequest: UpdateUserRequest,
  ): Promise<object> {
    if (!sessionInfo?.authInfo || !sessionInfo?.userId)
      throw errors.INVALID_SESSION;
    const user = await this.findUserById(sessionInfo.userId);
    return await this.userRepository.update(
      updateUserRequest.toEntity(sessionInfo, user.messages),
    );
  }

  validateUsername(username: string): void {
    const regexEngNum = /^[a-zA-Z0-9]*$/;
    const isValidLength = 4 <= username.length && username.length <= 15;
    const isValidCharacter = regexEngNum.test(username);

    if (!(isValidLength && isValidCharacter)) {
      throw errors.INVALID_ID;
    }
  }

  async checkDuplicatedUsername(username: string): Promise<void> {
    const user = await this.userRepository.findByUsername(username);
    if (user) {
      throw errors.ID_DUPLICATED;
    }
  }

  async getMessagesByUserId(session: SessionInfo): Promise<MessageWith[]> {
    if (!session.userId) {
      throw errors.NOT_LOGGED_IN;
    }

    const user = await this.findUserById(session.userId);

    return user.messages;
  }
}
