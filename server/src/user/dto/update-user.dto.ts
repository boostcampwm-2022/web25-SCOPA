import { plainToInstance } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
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

  @IsString()
  @MaxLength(1000)
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
  @MaxLength(80)
  worktype: string;

  @IsString()
  @MaxLength(80)
  worktime: string;

  @IsArray()
  @IsString({ each: true })
  @MaxLength(10, { each: true })
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
