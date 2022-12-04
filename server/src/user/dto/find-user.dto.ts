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
import { User } from 'src/user/entities/user.entity';
import { Pageable, Condition } from './pagination';

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
  liked?: true;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page = 1;

  getCondition(likedIds?: Array<string>): Condition {
    const techStack = [];
    this.skill1 && techStack.push(this.skill1);
    this.skill2 && techStack.push(this.skill2);
    this.skill3 && techStack.push(this.skill3);
    const condition = new Condition(
      this.interest,
      techStack,
      this.liked,
      likedIds,
    );
    return condition;
  }

  getPageable(limit: number, sort?: object): Pageable {
    return new Pageable(limit, this.page, sort);
  }
}

export class FindUserResponse {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  username: string;

  @IsString()
  code: string;

  @IsString()
  language: string;

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

  constructor(user: User, liked: boolean) {
    this.username = user.username;
    this.email = user.email;
    this.code = user.code;
    this.language = user.language;
    this.interest = user.interest;
    this.techStack = user.techStack;
    this.worktype = user.worktype;
    this.worktime = user.worktime;
    this.requirements = user.requirements;
    this.liked = liked;
  }
}
