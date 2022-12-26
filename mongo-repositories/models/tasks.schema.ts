import mongoose from 'mongoose';

import { TARGET_CONSTANTS } from '../tasks/tasks.constants';
import { ITask } from '../tasks/tasks.inteface';

export const taskSchema = new mongoose.Schema<ITask>(
  {
    target: { type: String, enum: TARGET_CONSTANTS, required: true },
    isCompleted: { type: Boolean, required: true, unique: true, default: false },
  },
  { timestamps: true }
);
