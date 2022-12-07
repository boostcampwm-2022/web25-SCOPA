import { IsString } from 'class-validator';

export class AddLikeRequest {
  @IsString()
  likedId: string;
}
