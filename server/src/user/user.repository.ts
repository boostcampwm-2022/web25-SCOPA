import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User) {
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

  async findUserById(id: string) {
    return await this.userModel.findOne().where('_id').equals(id);
  }

  async delete(user: UserDocument) {
    return await this.userModel.deleteOne({ id: user._id });
  }
}
