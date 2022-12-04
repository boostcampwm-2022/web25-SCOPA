import { IsEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { BaseEntity } from 'src/common/base-entity';

export type UserDocument = HydratedDocument<User>;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class User extends BaseEntity {
  @Prop({
    required: true,
  })
  authProvider: string;

  @Prop({
    required: true,
  })
  authId: string;

  @Prop({
    required: true,
  })
  @IsEmail()
  email: string;

  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop()
  interest?: string;

  @Prop()
  techStack?: string[];

  @Prop()
  code?: string;

  @Prop()
  language?: string;

  @Prop()
  worktype?: string;

  @Prop()
  worktime?: string;

  @Prop()
  requirements?: string[];
}

export const userSchema = SchemaFactory.createForClass(User);
userSchema.plugin(mongoosePaginate);
