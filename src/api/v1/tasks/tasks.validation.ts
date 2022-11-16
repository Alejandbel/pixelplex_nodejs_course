import { checkSchema } from 'express-validator';
import { TASKS_CONSTANTS } from './tasks.constants';

export class TasksValidation {
  static getUncompletedTasks = checkSchema({
    limit: {
      in: ['query'],
      exists: {
        errorMessage: 'Limit is required',
        options: { checkFalsy: true },
      },
      isInt: {
        options: {
          min: 0,
        },
        errorMessage: 'Incorrect limit',
      },
    },
    offset: {
      in: ['query'],
      exists: {
        errorMessage: 'Offset is required',
        options: { checkFalsy: true },
      },
      isInt: {
        options: {
          min: 0,
        },
        errorMessage: 'Incorrect offset',
      },
    },
    sort: {
      optional: true,
      in: ['query'],
      isIn: {
        options: [['asc', 'desc']],
      },
    },
    searchWord: {
      optional: true,
      in: ['query'],
    },
  });

  static getStatistic = checkSchema({
    dateBegin: {
      in: ['query'],
      exists: {
        errorMessage: 'DateBegin is required',
        options: { checkFalsy: true },
      },
      isDate: {
        errorMessage: 'Invalid date',
      },
    },
    dateEnd: {
      in: ['query'],
      exists: {
        errorMessage: 'DateEnd is required',
        options: { checkFalsy: true },
      },
      isDate: {
        errorMessage: 'Invalid date',
      },
    },
    languageId: {
      in: ['query'],
      exists: {
        errorMessage: 'Id is required',
        options: { checkFalsy: true },
      },
      isInt: {
        errorMessage: 'Invalid id',
        options: {
          min: 0,
        },
      },
    },
  });

  static getTask = checkSchema({
    id: {
      in: ['params'],
      exists: {
        errorMessage: 'id is required',
        options: { checkFalsy: true },
      },
      isInt: {
        errorMessage: 'Invalid id',
        options: {
          min: 0,
        },
      },
    },
  });

  static addTask = checkSchema({
    languageId: {
      in: ['body'],
      exists: {
        errorMessage: 'Id is required',
        options: { checkFalsy: true },
      },
      isInt: {
        errorMessage: 'Invalid id',
        options: {
          min: 0,
        },
      },
    },
    target: {
      in: ['body'],
      exists: {
        errorMessage: 'target is required',
        options: { checkFalsy: true },
      },
      isIn: {
        options: [[TASKS_CONSTANTS.TO_FOREIGN, TASKS_CONSTANTS.TO_NATIVE]],
      },
    },
  });

  static completeTask = checkSchema({
    id: {
      in: ['params'],
      exists: {
        errorMessage: 'Id is required',
        options: { checkFalsy: true },
      },
      isInt: {
        errorMessage: 'Invalid id',
        options: {
          min: 0,
        },
      },
    },
    answer: {
      in: ['body'],
      exists: {
        errorMessage: 'Answer is required',
        options: { checkFalsy: true },
      },
    },
  });
}
