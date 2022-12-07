import { IsHexadecimal, IsString, Length, MaxLength } from 'class-validator';

export class SendMessageRequest {
  @IsString()
  @IsHexadecimal()
  @Length(24, 24)
  to: string;

  @IsString()
  @MaxLength(140)
  content: string;
}
