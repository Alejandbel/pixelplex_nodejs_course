import { checkSchema } from 'express-validator';

import { SORT_TYPES } from '@constants';

import { TARGET_CONSTANTS } from './tasks.constants';

export class TasksValidation {
  static getUncompletedTasks = checkSchema({
    limit: {
      in: ['query'],
      exists: {
        options: { checkFalsy: true },
      },
      isInt: {
        options: {
          min: 0,
        },
      },
    },
    offset: {
      in: ['query'],
      exists: {
        options: { checkFalsy: true },
      },
      isInt: {
        options: {
          min: 0,
        },
      },
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
        options: { checkFalsy: true },
      },
      isDate: true,
    },
    dateEnd: {
      in: ['query'],
      exists: {
        options: { checkFalsy: true },
      },
      isDate: true,
    },
    languageId: {
      in: ['query'],
      exists: {
        options: { checkFalsy: true },
      },
      isInt: {
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
        options: { checkFalsy: true },
      },
      isInt: {
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
        options: { checkFalsy: true },
      },
      isInt: {
        options: {
          min: 0,
        },
      },
      toInt: true,
    },
    target: {
      in: ['body'],
      exists: {
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
        options: { checkFalsy: true },
      },
      isInt: {
        options: {
          min: 0,
        },
      },
    },
    answer: {
      in: ['body'],
      exists: {
        options: { checkFalsy: true },
      },
    },
  });
}
