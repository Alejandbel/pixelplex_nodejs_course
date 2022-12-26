import { Types } from 'mongoose';

export interface ILanguage {
  _id: Types.ObjectId;
  title: string;
  code: string;
  createdAt?: Date;
  updatedAt?: Date;
}
