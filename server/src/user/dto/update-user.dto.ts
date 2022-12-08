import { plainToInstance } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { MessageWith, User } from 'src/user/entities/user.entity';
import { Interest, Language, TechStack } from 'src/common/enum';
import { SessionInfo } from 'src/common/d';

export class UpdateUserRequest {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  code: string;

  @IsEnum(Language)
  language: Language;

  @IsEnum(Interest, { each: true })
  interest: Interest;

  @IsArray()
  @IsEnum(TechStack, { each: true })
  @ArrayMaxSize(3)
  techStack: TechStack[];

  @IsString()
  worktype: string;

  @IsString()
  worktime: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(2)
  requirements: string[];

  toEntity(sessionInfo: SessionInfo, messages: MessageWith[]): User {
    return plainToInstance(User, {
      ...sessionInfo.authInfo,
      ...this,
      messages,
      _id: sessionInfo.userId,
    });
  }
}
