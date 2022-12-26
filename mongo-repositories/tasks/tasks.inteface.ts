import { Types } from 'mongoose';

import { TARGET_CONSTANTS } from './tasks.constants';

export interface ITask {
  _id: Types.ObjectId;
  target: TARGET_CONSTANTS;
  isCompleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
