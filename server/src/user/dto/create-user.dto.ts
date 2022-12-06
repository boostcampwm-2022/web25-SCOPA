import { plainToInstance } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { AuthInfo } from 'src/d';
import { User } from 'src/user/entities/user.entity';

export class CreateUserRequestDto {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  username: string;

  @IsString()
  interest: string;

  @IsArray()
  @ArrayMaxSize(3)
  @IsString({ each: true })
  techStack: string[];

  toEntity(authInfo?: AuthInfo): User {
    const user = plainToInstance(User, { ...this, ...authInfo });
    user.techStack = this.techStack;
    return user;
  }
}
