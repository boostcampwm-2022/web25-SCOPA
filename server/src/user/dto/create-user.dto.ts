import { IsArray, IsString, MaxLength, MinLength } from 'class-validator';
import { plainToInstance } from 'class-transformer';

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
  @IsString({ each: true })
  techStack: string[];

  toEntity(authInfo?: AuthInfo): User {
    return plainToInstance(User, { ...this, ...authInfo });
  }
}
