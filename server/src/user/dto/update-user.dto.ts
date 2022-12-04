import { SessionInfo } from 'src/common/d';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import {
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserRequest {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  code: string;

  @IsString()
  language: string;

  @IsString()
  interest: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(3)
  techStack: string[];

  @IsString()
  worktype: string;

  @IsString()
  worktime: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(2)
  requirements: string[];

  toEntity(sessionInfo: SessionInfo): User {
    return plainToInstance(User, {
      ...sessionInfo.authInfo,
      ...this,
      _id: sessionInfo.userId,
    });
  }
}
