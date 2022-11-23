import { IsArray, IsString } from 'class-validator';

import { UserInfo } from 'src/d';
import { User } from 'src/user/entities/user.entity';

export class CreateUserRequestDto {
  @IsString()
  username: string;

  @IsString()
  interest: string;

  @IsArray()
  techStack: string[];

  toEntity(userInfo?: UserInfo): User {
    const userDto = { ...this, ...userInfo };
    return userDto;
  }
}
