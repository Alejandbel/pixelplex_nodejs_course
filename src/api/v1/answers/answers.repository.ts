import { Between, Equal } from 'typeorm';

import { Language } from '@languages';
import { TARGET_CONSTANTS } from '@tasks';

import { Answer } from './answers.entity';

export class AnswersRepository {
  static create = async (userId: number, taskId: number, answerWord: string, isSuccess: boolean): Promise<Answer> => {
    const answer = Answer.create({ userId, taskId, answerWord, isSuccess });
    return Answer.save(answer);
  };

  static getSuccess = async (userId: number, dateBegin: Date, dateEnd: Date, language: Language): Promise<number> => {
    const basicCondition = {
      userId: Equal(userId),
      createdAt: Between(dateBegin, dateEnd),
      isSuccess: true,
    };

    return Answer.count({
      where: [
        {
          ...basicCondition,
          task: {
            target: TARGET_CONSTANTS.TO_NATIVE,
            card: {
              foreignWord: {
                language: Equal(language),
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
                language: Equal(language),
              },
            },
          },
        },
      ],
    });
  };

  static getFailed = async (userId: number, dateBegin: Date, dateEnd: Date, language: Language): Promise<number> => {
    const basicCondition = {
      userId: Equal(userId),
      createdAt: Between(dateBegin, dateEnd),
      isSuccess: false,
    };

    return Answer.count({
      where: [
        {
          ...basicCondition,
          task: {
            target: TARGET_CONSTANTS.TO_NATIVE,
            card: {
              foreignWord: {
                language: Equal(Language),
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
                language: Equal(language),
              },
            },
          },
        },
      ],
    });
  };
}
