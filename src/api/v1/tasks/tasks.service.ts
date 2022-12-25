import { AnswersRepository } from '@answers';
import { CardsRepository } from '@cards';
import { SORT_TYPES } from '@constants';
import { SERVICE_ERROR_STATUS, ServiceError } from '@errors';
import { LanguagesRepository } from '@languages';
import { UsersRepository } from '@users';

import { RESULT_CONSTANTS, TARGET_CONSTANTS } from './tasks.constants';
import { TasksRepository } from './tasks.repository';
import { TaskDTO } from './tasks.service.mapper';

export class TasksService {
  static getUncompletedTasks = async (
    limit: number,
    offset: number,
    sort: SORT_TYPES | undefined,
    searchWord: string | undefined,
    userId: number
  ): Promise<[TaskDTO[], number]> => {
    const [tasks, count] = await TasksRepository.getAllSortedAndFilteredByUserWithCount(
      limit,
      offset,
      sort,
      searchWord,
      userId
    );

    return [tasks.map((task) => new TaskDTO(task)), count];
  };

  static getStatistic = async (
    dateBegin: Date,
    dateEnd: Date,
    languageId: number,
    userId: number
  ): Promise<{ correct: number; incorrect: number }> => {
    const language = await LanguagesRepository.findByIdOrFail(languageId);

    const correctPromise = AnswersRepository.getStatisticByStatus(userId, dateBegin, dateEnd, language, true);
    const incorrectPromise = AnswersRepository.getStatisticByStatus(userId, dateBegin, dateEnd, language, false);

    const [correct, incorrect] = await Promise.all([correctPromise, incorrectPromise]);
    return { correct, incorrect };
  };

  static getTask = async (id: number, userId: number): Promise<TaskDTO> => {
    const task = await TasksRepository.findByIdOrFail(id);

    if (task.userId != userId) {
      throw new ServiceError(SERVICE_ERROR_STATUS.NOT_ALLOWED);
    }

    return new TaskDTO(task);
  };

  static addTask = async (foreignLanguageId: number, target: TARGET_CONSTANTS, userId: number): Promise<TaskDTO> => {
    const user = await UsersRepository.findByIdOrFail(userId);

    const nativeLanguageId = user.languageId;

    if (!nativeLanguageId) {
      throw new ServiceError(SERVICE_ERROR_STATUS.LANGUAGE_NOT_SET);
    }

    const card = await CardsRepository.getRandomCardByUserAndLanguages(userId, nativeLanguageId, foreignLanguageId);

    const task = await TasksRepository.create(card, userId, target);

    return new TaskDTO(task);
  };

  static completeTask = async (id: number, answer: string, userId: number): Promise<RESULT_CONSTANTS> => {
    const task = await TasksRepository.findByIdOrFail(id);

    if (task.userId != userId) {
      throw new ServiceError(SERVICE_ERROR_STATUS.NOT_ALLOWED);
    }

    await TasksRepository.update(task.id, { isCompleted: true });

    let isCorrect: boolean;
    switch (task.target) {
      case TARGET_CONSTANTS.TO_NATIVE: {
        isCorrect = answer.trim().toLowerCase() === task.card.nativeWord.word.trim().toLowerCase();
        break;
      }
      case TARGET_CONSTANTS.TO_FOREIGN: {
        isCorrect = answer.trim().toLowerCase() === task.card.foreignWord.word.trim().toLowerCase();
        break;
      }
    }

    const result = isCorrect ? RESULT_CONSTANTS.CORRECT : RESULT_CONSTANTS.INCORRECT;

    await AnswersRepository.create(userId, task.id, answer, isCorrect);

    return result;
  };
}
