import mongoose from 'mongoose';

import { USER_ROLES } from '../users/users.constants';
import { IUser } from '../users/users.interface';

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    normalizedEmail: { type: String, required: true, index: true },
    role: { type: String, enum: USER_ROLES, required: true, default: USER_ROLES.USER },
    language: {
      ref: 'language',
      type: mongoose.SchemaTypes.ObjectId,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);
export { User };
