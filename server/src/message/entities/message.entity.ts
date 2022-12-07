import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsString } from 'class-validator';

import { Content } from './content.entity';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ versionKey: false })
export class Message {
  @Prop({ required: true })
  @IsString()
  participants: string;

  @Prop({ required: true })
  contents: Content[];
}

export const messageSchema = SchemaFactory.createForClass(Message);
