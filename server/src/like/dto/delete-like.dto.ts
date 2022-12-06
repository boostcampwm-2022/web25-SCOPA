import { IsString } from 'class-validator';

export class DeleteLikeRequest {
  @IsString()
  likedId: string;
}
