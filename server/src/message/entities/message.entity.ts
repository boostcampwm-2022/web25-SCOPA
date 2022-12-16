import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsString } from 'class-validator';

import { Content } from './content.entity';
import { BaseEntity } from 'src/common/base-entity';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ versionKey: false, timestamps: true })
export class Message extends BaseEntity {
  @Prop({ required: true })
  @IsString()
  participants: string;

  @Prop({ required: true })
  contents: Content[];
}

export const messageSchema = SchemaFactory.createForClass(Message);
