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
    foreignWord: String,
    nativeLanguage: {
      ref: 'language',
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    nativeWord: String,
    answerWord: String,
    isSuccess: Boolean,
  },
  { timestamps: true }
);

const Answer = mongoose.model('answer', answerSchema);
export { Answer };
