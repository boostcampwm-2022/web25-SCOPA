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

  @IsString()
  code: string;

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

  @IsEmail()
  email: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(2)
  requirements: string[];
}
