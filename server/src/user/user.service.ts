import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RequestUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserInfo } from 'src/d';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // 유저 생성
  async create(userDto: RequestUserDto, userInfo: UserInfo): Promise<User> {
    return await this.userRepository.create({
      ...userInfo,
      username: userDto.username,
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
      throw new HttpException('일치하는 유저 정보가 없습니다', 401);
    }

    // 일치 -> 유저 정보 삭제 -> 결과 반환

    return true;
  }
}
