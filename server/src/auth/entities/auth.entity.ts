import { Document } from 'mongoose';
import { IsEmail } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Auth extends Document {
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
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  @IsEmail()
  email: string;
}

export const authSchema = SchemaFactory.createForClass(Auth);
