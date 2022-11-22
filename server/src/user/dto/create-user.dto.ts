import { IsArray, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @IsString()
  username: string;

  @IsString()
  interest: string;

  @IsArray()
  techStack: string[];
}
