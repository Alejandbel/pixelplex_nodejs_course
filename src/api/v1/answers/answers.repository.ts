import { Between, Equal } from 'typeorm';

import { Language } from '@languages';
import { TARGET_CONSTANTS } from '@tasks';

import { Answer } from './answers.entity';

export class AnswersRepository {
  static create = async (userId: number, taskId: number, answerWord: string, isSuccess: boolean): Promise<Answer> => {
    const answer = Answer.create({ userId, taskId, answerWord, isSuccess });
    return Answer.save(answer);
  };

  static getStatisticByStatus = async (
    userId: number,
    dateBegin: Date,
    dateEnd: Date,
    language: Language,
    isSuccess: boolean
  ): Promise<number> => {
    const basicCondition = {
      userId: Equal(userId),
      createdAt: Between(dateBegin, dateEnd),
      isSuccess,
    };

    return Answer.count({
      where: [
        {
          ...basicCondition,
          task: {
            target: TARGET_CONSTANTS.TO_NATIVE,
            card: {
              foreignWord: {
                language: Equal(language.id),
              },
            },
          },
        },
        {
          ...basicCondition,
          task: {
            target: TARGET_CONSTANTS.TO_FOREIGN,
            card: {
              nativeWord: {
                language: Equal(language.id),
              },
            },
          },
        },
      ],
    });
  };
}
