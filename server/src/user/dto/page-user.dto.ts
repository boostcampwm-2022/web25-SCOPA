import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';
import { PaginateResult } from 'mongoose';

import { User } from 'src/user/entities/user.entity';
import { TechStack, Interest, Language } from 'src/common/enum';

export class PageUserResponse {
  @IsNumber()
  totalPage: number; // 전체 페이지 수

  @IsNumber()
  currentPage: number; // 현재 페이지 번호

  @IsNumber()
  totalNumOfData: number; // 총 데이터 개수

  @IsArray()
  list: SimplaUserResponse[];

  constructor(
    paginate: PaginateResult<User>,
    likedIds: Array<string> | undefined,
    liked: boolean | undefined,
  ) {
    this.totalPage = paginate.totalPages;
    this.currentPage = paginate.page;
    this.totalNumOfData = paginate.totalDocs;
    this.list = paginate.docs.map(
      (user) => new SimplaUserResponse(user, likedIds, liked),
    );
  }
}

export class SimplaUserResponse {
  @IsString()
  id: string;

  @IsString()
  code: string;

  @IsEnum(Language)
  language: Language;

  @IsEnum(Interest)
  interest: Interest;

  @IsArray()
  @IsString({ each: true })
  @IsEnum(TechStack, { each: true })
  techStack: TechStack[];

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(2)
  requirements: string[];

  @IsBoolean()
  liked: boolean;

  constructor(
    user: User,
    likedIds: Array<string> | undefined,
    liked: boolean | undefined,
  ) {
    this.id = user._id.toString();
    this.code = user.code;
    this.language = user.language;
    this.interest = user.interest;
    this.techStack = user.techStack;
    this.requirements = user.requirements;
    this.liked = this.isLiked(user._id.toString(), likedIds, liked);
  }

  private isLiked(
    userId: string,
    likedIds: Array<string> | undefined,
    liked: boolean | undefined,
  ) {
    //로그인X
    if (likedIds === undefined) {
      return false;
    }
    //로그인O and liked 쿼리 존재
    if (liked !== undefined) {
      return liked;
    }
    //로그인O and liked 쿼리X
    return likedIds.includes(userId);
  }
}
