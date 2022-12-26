import { Types } from 'mongoose';

import { TARGET_CONSTANTS } from '../tasks/tasks.constants';

export interface IAnswer {
  user: Types.ObjectId;
  target: TARGET_CONSTANTS;
  foreignLanguage: Types.ObjectId;
  foreignWord: string;
  nativeLanguage: Types.ObjectId;
  nativeWord: string;
  answerWord: string;
  isSuccess: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
