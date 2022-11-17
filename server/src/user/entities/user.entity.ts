import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';

@Schema({
  versionKey: false,
  timestamps: { createdAt: 'createAt', updatedAt: 'updatedAt' },
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
}

export const userSchema = SchemaFactory.createForClass(User);
