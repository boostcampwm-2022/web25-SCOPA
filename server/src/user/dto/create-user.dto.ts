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

export class CreateUserRequest {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  username: string;

  @IsString()
  interest: string;

  @IsArray()
  @ArrayMaxSize(3)
  @IsString({ each: true })
  skills: string[];

  toEntity(authInfo?: AuthInfo): User {
    return plainToInstance(User, { ...this, ...authInfo });
  }
}
