import { plainToInstance } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { AuthInfo } from 'src/common/d';
import { Interest, TechStack } from 'src/common/enum';
import { User } from 'src/user/entities/user.entity';

export class CreateUserRequest {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  username: string;

  @IsEnum(Interest)
  interest: Interest;

  @IsArray()
  @ArrayMaxSize(3)
  @IsEnum(TechStack, { each: true })
  techStack: TechStack[];

  toEntity(authInfo?: AuthInfo): User {
    return plainToInstance(User, { ...this, ...authInfo, messages: [] });
  }
}
