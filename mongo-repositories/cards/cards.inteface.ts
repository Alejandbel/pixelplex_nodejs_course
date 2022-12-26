import { Types } from 'mongoose';

import { ITask } from '../tasks/tasks.inteface';

export interface ICard {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  foreignLanguage: Types.ObjectId;
  foreignWord: string;
  nativeLanguage: Types.ObjectId;
  nativeWord: string;
  tasks: ITask[];
  createdAt?: Date;
  updatedAt?: Date;
}
