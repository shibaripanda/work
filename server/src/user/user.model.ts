import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

export interface User {
  link?: string;
  name?: string;
}

export type UserDocument = User & mongoose.Document;
