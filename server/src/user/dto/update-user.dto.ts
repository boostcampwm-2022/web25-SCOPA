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
}
