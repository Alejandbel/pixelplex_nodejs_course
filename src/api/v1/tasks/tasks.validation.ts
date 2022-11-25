import { checkSchema } from 'express-validator';
import { TARGET_CONSTANTS } from './tasks.constants';
import { SORT_TYPES } from '@constants';

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
      toInt: true,
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
      toInt: true,
    },
    sort: {
      optional: true,
      in: ['query'],
      isIn: {
        options: [[SORT_TYPES.ASC, SORT_TYPES.DESC]],
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
      toDate: true,
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
      toDate: true,
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
      toInt: true,
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
      toInt: true,
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
      toInt: true,
    },
    target: {
      in: ['body'],
      exists: {
        errorMessage: 'target is required',
        options: { checkFalsy: true },
      },
      isIn: {
        options: [[TARGET_CONSTANTS.TO_FOREIGN, TARGET_CONSTANTS.TO_NATIVE]],
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
      toInt: true,
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
