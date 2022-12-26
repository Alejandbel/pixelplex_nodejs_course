import { Types } from 'mongoose';

import { Answer } from '../models/answer.model';
import { TARGET_CONSTANTS } from '../tasks/tasks.constants';

import { IAnswer } from './answers.interface';

export class AnswersRepository {
  static create = async (
    userId: Types.ObjectId,
    taskId: Types.ObjectId,
    answerWord: string,
    isSuccess: boolean,
    target: TARGET_CONSTANTS,
    foreignLanguageId: Types.ObjectId,
    foreignWord: string,
    nativeLanguageId: Types.ObjectId,
    nativeWord: string
  ): Promise<IAnswer> => {
    return Answer.create({
      user: userId,
      task: taskId,
      answerWord,
      isSuccess,
      foreignWord,
      nativeWord,
      nativeLanguage: nativeLanguageId,
      foreignLanguage: foreignLanguageId,
      target,
    });
  };

  static getStatisticByStatus = async (
    userId: Types.ObjectId,
    dateBegin: Date,
    dateEnd: Date,
    languageId: Types.ObjectId,
    isSuccess: boolean
  ): Promise<number> => {
    return Answer.countDocuments({
      createdAt: {
        $gt: dateBegin,
        $lt: dateEnd,
      },
      user: userId,
      $or: [{ nativeLanguage: languageId }, { foreignLanguage: languageId }],
      isSuccess,
    });
  };
}
