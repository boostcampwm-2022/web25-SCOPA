import { Injectable } from '@nestjs/common';

import { AuthInfo, SessionInfo } from 'src/d';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { errors } from 'src/common/response/index';
import { CreateUserRequest } from './dto/create-user.dto';
import { LikeRepository } from './../like/like.repository';
import { UpdateUserRequest } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly likeRepository: LikeRepository,
  ) {}

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

  async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw errors.NOT_MATCHED_USER;
    }
    return user;
  }

  async findUserByAuth(authProvider: string, authId: string): Promise<User> {
    return await this.userRepository.findUserByAuthProviderAndAuthId(
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
    await this.findUserById(sessionInfo.userId);
    return await this.userRepository.updateUser(
      updateUserRequest.toEntity(sessionInfo),
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
    const user = await this.userRepository.findUserByUsername(username);
    if (user) {
      throw errors.ID_DUPLICATED;
    }
  }
}
