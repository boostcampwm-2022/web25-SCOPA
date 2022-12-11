import { Prop, Schema } from '@nestjs/mongoose';
import { IsString } from 'class-validator';

@Schema({ versionKey: false })
export class Content {
  @Prop({ required: true })
  @IsString()
  from: string;

  @Prop({ required: true })
  @IsString()
  content: string;

  @Prop({ required: true })
  readonly createdAt: Date = new Date();
}
