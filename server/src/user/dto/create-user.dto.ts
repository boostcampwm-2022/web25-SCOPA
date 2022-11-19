import { IsArray, IsEmail, IsString } from 'class-validator';

export class RequestUserDto {
  @IsString()
  username: string;

  @IsString()
  interest: string;

  @IsArray()
  techStack: string[];
}

export class CreateUserDto {
  @IsString()
  authProvider: string;

  @IsString()
  authId: string;

  @IsEmail()
  email: string;

  @IsString()
  username: string;
}
