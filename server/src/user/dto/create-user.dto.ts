import { IsArray, IsString } from 'class-validator';

import { AuthInfo } from 'src/d';
import { User } from 'src/user/entities/user.entity';

export class CreateUserRequestDto {
  @IsString()
  username: string;

  @IsString()
  interest: string;

  @IsArray()
  techStack: string[];

  toEntity(authInfo?: AuthInfo): User {
    const userDto = { ...this, ...authInfo };
    return userDto;
  }
}
