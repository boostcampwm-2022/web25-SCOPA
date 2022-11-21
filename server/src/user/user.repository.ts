import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: CreateUserDto) {
    return await this.userModel.create(user);
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findUserByAuthProviderAndAuthId(authProvider: string, authId: string) {
    return await this.userModel
      .findOne()
      .and([{ authProvider: authProvider }, { authId: authId }])
      .exec();
  }

  async findUserByUsername(username: string) {
    return await this.userModel.findOne().where('username').equals(username);
  }

  async delete(user: User) {
    return await this.userModel.deleteOne({ id: user.id });
  }
}
