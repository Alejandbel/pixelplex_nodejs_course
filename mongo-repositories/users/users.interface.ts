import { Types } from 'mongoose';

import { USER_ROLES } from './users.constants';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  password: string;
  email: string;
  normalizedEmail: string;
  role: USER_ROLES;
  language: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
