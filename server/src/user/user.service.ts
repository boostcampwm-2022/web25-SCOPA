import { HttpException, Injectable } from '@nestjs/common';

import { CreateUserRequestDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserInfo } from 'src/d';
import { UserRepository } from './user.repository';
import { errors } from 'src/common/response/error-response';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // 유저 생성
  async create(
    userDto: CreateUserRequestDto,
    userInfo: UserInfo,
  ): Promise<User> {
    // 유효성 검사
    this.validateUsername(userDto.username);

    return await this.userRepository.create({
      ...userInfo,
      ...userDto,
    });
  }

  // 유저 전체 조회
  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findOne(authProvider: string, authId: string) {
    return await this.userRepository.findUserByAuthProviderAndAuthId(
      authProvider,
      authId,
    );
  }

  // 유저 삭제
  async remove(userInfo: UserInfo) {
    // 요청받은 유저 정보가 DB 정보와 일치하는 지 확인하기
    const { authProvider, authId, email } = { ...userInfo };

    const user = await this.userRepository.findUserByAuthProviderAndAuthId(
      authProvider,
      authId,
    );

    // 불일치 -> 에러 반환
    if (!user) {
      throw errors.NOT_MATCHED_USER;
    }

    // 일치 -> 유저 정보 삭제 -> 결과 반환
    return this.userRepository.delete(user);
  }

  validateUsername(username: string) {
    const regexEngNum = /^[a-zA-Z0-9]*$/;
    const isValidLength = username.length >= 4 && username.length <= 15;
    const isValidCharacter = regexEngNum.test(username);

    if (!(isValidLength && isValidCharacter)) {
      throw errors.INVALID_ID;
    }
  }

  checkDuplicatedUsername(username: string) {
    const user = this.userRepository.findUserByUsername(username);

    if (user) {
      throw errors.ID_DUPLICATED;
    }
  }
}
