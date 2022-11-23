import { IsEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  versionKey: false,
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class User {
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
  priorityStack?: string;

  @Prop()
  code?: string;

  @Prop()
  workPattern?: string;

  @Prop()
  workTime?: string;

  @Prop()
  requirements?: string[];
}

export const userSchema = SchemaFactory.createForClass(User);
