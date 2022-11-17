import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInfo } from 'src/d';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // 유저 생성
  async create(userDto: CreateUserDto, userInfo: UserInfo): Promise<User> {
    const createdUser = new this.userModel({
      ...userInfo,
      username: userDto.username,
    });

    return createdUser.save();
  }

  // 유저 전체 조회
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
