import { IsArray, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  interest: string;

  @IsArray()
  techStack: string[];
}
