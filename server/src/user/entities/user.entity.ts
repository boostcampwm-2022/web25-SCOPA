import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';

@Schema({
  versionKey: false,
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class User extends Document {
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
  field: string;

  @Prop()
  stack: string;

  @Prop()
  priorityStack: string;

  @Prop()
  code: string;

  @Prop()
  workPattern: string;

  @Prop()
  workTime: string;

  @Prop()
  requirement: string;
}

export const userSchema = SchemaFactory.createForClass(User);
