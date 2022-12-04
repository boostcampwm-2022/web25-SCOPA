import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class PageUserResponseDto {
  @IsNumber()
  @Min(0)
  totalPage: number; // 전체 페이지 수

  @IsNumber()
  @Min(0)
  currentPage: number; // 현재 페이지 번호

  @IsNumber()
  @Min(0)
  totalNumOfData: number; // 총 데이터 개수

  @IsArray()
  list: SimplaUserResponseDto[];
}

class SimplaUserResponseDto {
  @IsString()
  id: string;

  @IsString()
  language: string;

  @IsString()
  code: string;

  @IsArray()
  @IsString({ each: true })
  techStack: string[];

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(2)
  requirements: string[];

  @IsBoolean()
  liked: boolean;
}
