import { IsString } from 'class-validator';

export class DeleteLikeRequestDto {
  @IsString()
  likedId: string;
}
