import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FindUserRequest {
  @IsString()
  @IsOptional()
  interest?: string;

  @IsString()
  @IsOptional()
  skill1?: string;

  @IsString()
  @IsOptional()
  skill2?: string;

  @IsString()
  @IsOptional()
  skill3?: string;

  @Type(() => Boolean)
  @IsOptional()
  liked?: boolean;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  pages = 1;
}

export class FindUserResponse {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  username: string;

  @IsString()
  code: string;

  @IsString()
  interest: string;

  @IsArray()
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

  @IsBoolean()
  liked: boolean;
}
