import { Types } from 'mongoose';

import { ITask } from '../tasks/tasks.inteface';

export interface ICard {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  foreignWord: {
    language: Types.ObjectId;
    word: string;
  };
  nativeWord: {
    language: Types.ObjectId;
    word: string;
  };
  tasks: ITask[];
  createdAt?: Date;
  updatedAt?: Date;
}
