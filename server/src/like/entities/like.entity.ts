import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsString } from 'class-validator';

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
  likedId: string[];
}

export const likeSchema = SchemaFactory.createForClass(Like);
