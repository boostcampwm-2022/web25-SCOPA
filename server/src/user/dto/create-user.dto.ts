import { IsString } from 'class-validator';
import { UserInfo } from 'src/d';

export class CreateUserDto {
  @IsString()
  username: string;
}
