import { IsString } from 'class-validator';

export class AddLikeRequestDto {
  @IsString()
  likedId: string;
}
