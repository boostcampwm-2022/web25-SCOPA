import { Document, HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsString } from 'class-validator';

export type LikeDocument = HydratedDocument<Like>;

@Schema({
  versionKey: false,
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Like extends Document {
  @Prop({
    required: true,
  })
  @IsString()
  userId: string;

  @Prop({
    required: true,
  })
  @IsArray()
  likedIds: string[];
}

export const likeSchema = SchemaFactory.createForClass(Like);