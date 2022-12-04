import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Pageable, Condition } from './dto/pagination';

import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: PaginateModel<UserDocument>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.userModel.create(user);
  }

  //페이징
  async findAll(condition: Condition, pageable: Pageable) {
    console.log(condition, pageable);

    return await this.userModel.paginate(condition, pageable);
  }

  async findByAuthProviderAndAuthId(
    authProvider: string,
    authId: string,
  ): Promise<User> {
    return await this.userModel
      .findOne()
      .and([{ authProvider: authProvider }, { authId: authId }])
      .exec();
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne().where('username').equals(username);
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findOne().where('_id').equals(id);
  }

  async deleteById(userId: string): Promise<object> {
    return await this.userModel.deleteOne({ id: userId });
  }

  async update(user: User): Promise<object> {
    return this.userModel.replaceOne({ _id: user._id }, user);
  }
}
