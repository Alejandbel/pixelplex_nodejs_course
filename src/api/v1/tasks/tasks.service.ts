import { SORT_TYPES } from '@constants';

import { RESULT_CONSTANTS, TARGET_CONSTANTS } from './tasks.constants';
import { Task } from './tasks.entity';

export class TasksService {
  static getUncompletedTasks = async (
    limit: number,
    offset: number,
    sort: SORT_TYPES,
    searchWord: string
  ): Promise<Task[]> => {
    console.log('getUncompletedTasks', limit, offset, sort, searchWord);
    return [
      {
        id: 1,
        foreignLanguageId: 2,
        word: 'House',
        target: TARGET_CONSTANTS.TO_FOREIGN,
      },
      {
        id: 2,
        foreignLanguageId: 3,
        word: 'Дом',
        target: TARGET_CONSTANTS.TO_NATIVE,
      },
    ];
  };

  static getStatistic = async (
    dateBegin: Date,
    dateEnd: Date,
    languageId: number
  ): Promise<{ correct: number; incorrect: number }> => {
    console.log('getStatistic', dateBegin, dateEnd, languageId);
    return {
      correct: 10,
      incorrect: 20,
    };
  };

  static getTask = async (id: number): Promise<Task> => {
    console.log('getTask', id);
    return {
      id: 1,
      foreignLanguageId: 2,
      word: 'House',
      target: TARGET_CONSTANTS.TO_NATIVE,
    };
  };

  static addTask = async (languageId: number, target: TARGET_CONSTANTS): Promise<Task> => {
    console.log('addTask', languageId, target);
    return new Task('House', languageId, target);
  };

  static completeTask = async (id: number, answer: string): Promise<RESULT_CONSTANTS> => {
    console.log('completeTask', id, answer);
    return RESULT_CONSTANTS.CORRECT;
  };
}
