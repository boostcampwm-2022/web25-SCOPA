import { Injectable } from '@nestjs/common';

import { AuthInfo } from 'src/d';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { errors } from 'src/common/response/error-response';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { LikeRepository } from './../like/like.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly likeRepository: LikeRepository,
  ) {}

  // 유저 생성
  async createUser(
    userDto: CreateUserRequestDto,
    authInfo: AuthInfo,
  ): Promise<User> {
    // fix 할 때 고칠 내용, ci 를 통과하기 위해 잠시 사용
    authInfo;

    // 유효성 검사
    this.validateUsername(userDto.username);
    // 중복 검사
    await this.checkDuplicatedUsername(userDto.username);

    const user = userDto.toEntity(authInfo);
    const createdUser = await this.userRepository.create(user);

    if (!createdUser) {
      throw errors.REGIST_FAIL;
    }
    await this.likeRepository.createLike(createdUser._id.toString());

    return createdUser;
  }

  // 유저 전체 조회
  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findOne(authProvider: string, authId: string): Promise<User> {
    return await this.userRepository.findUserByAuthProviderAndAuthId(
      authProvider,
      authId,
    );
  }

  // 유저 삭제
  async remove(userId: string): Promise<object> {
    // 요청받은 유저 정보가 DB 정보와 일치하는 지 확인하기
    const user = await this.userRepository.findUserById(userId);

    // 불일치 -> 에러 반환
    if (!user) {
      throw errors.NOT_MATCHED_USER;
    }

    // 일치 -> 유저 정보 삭제 -> 결과 반환
    return this.userRepository.deleteById(userId);
  }

  validateUsername(username: string): void {
    const regexEngNum = /^[a-zA-Z0-9]*$/;
    const isValidLength = username.length >= 4 && username.length <= 15;
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
