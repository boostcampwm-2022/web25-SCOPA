import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

import { User } from 'src/user/entities/user.entity';
import { Pageable, Condition } from './pagination';
import { TechStack, Interest, Language } from 'src/common/enum';

export class FindUserRequest {
  @IsOptional()
  @IsEnum(Interest)
  interest?: Interest;

  @IsOptional()
  @IsEnum(TechStack, { each: true })
  skill1?: TechStack;

  @IsOptional()
  @IsEnum(TechStack, { each: true })
  skill2?: TechStack;

  @IsOptional()
  @IsEnum(TechStack, { each: true })
  skill3?: TechStack;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  liked?: true;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page = 1;

  getCondition(likedIds?: string[]): Condition {
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

  @IsEnum(Language)
  language: Language;

  @IsEnum(Interest, { each: true })
  interest: Interest;

  @IsArray()
  @ArrayMaxSize(3)
  @IsEnum(TechStack, { each: true })
  techStack: TechStack[];

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
