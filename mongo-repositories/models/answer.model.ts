import mongoose from 'mongoose';

import { IAnswer } from '../answers/answers.interface';
import { TARGET_CONSTANTS } from '../tasks/tasks.constants';

const answerSchema = new mongoose.Schema<IAnswer>(
  {
    user: {
      ref: 'user',
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    task: {
      ref: 'task',
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    target: {
      type: String,
      enum: TARGET_CONSTANTS,
      required: true,
    },
    foreignLanguage: {
      ref: 'language',
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    foreignWord: {
      type: String,
      required: true,
    },
    nativeLanguage: {
      ref: 'language',
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    nativeWord: {
      type: String,
      required: true,
    },
    answerWord: {
      type: String,
      required: true,
    },
    isSuccess: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Answer = mongoose.model('answer', answerSchema);
export { Answer };
