import mongoose from 'mongoose';

export class BaseEntity {
  readonly _id: mongoose.Types.ObjectId;
  readonly createdAt: string;
  readonly updatedAt: string;
}
