import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsString } from 'class-validator';

import { BaseEntity } from 'src/common/base-entity';

export type LikeDocument = HydratedDocument<Like>;

@Schema({
  versionKey: false,
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Like extends BaseEntity {
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
