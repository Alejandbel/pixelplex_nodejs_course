import { checkSchema } from 'express-validator';
import { SORT_TYPES } from '@constants';
import { LANGUAGES_ORDER_BY } from './languages.constants';

export class LanguagesValidation {
  static getAllLanguages = checkSchema({
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
    orderBy: {
      in: ['query'],
      optional: true,
      isIn: {
        options: [[LANGUAGES_ORDER_BY.NAME, LANGUAGES_ORDER_BY.DATE]],
      },
    },
    search: {
      in: ['query'],
      optional: true,
    },
  });

  static getLanguage = checkSchema({
    id: {
      in: ['params'],
      exists: {
        options: {
          checkFalsy: true,
        },
      },
      isInt: {
        options: {
          min: 0,
        },
      },
    },
  });

  static addLanguage = checkSchema({
    title: {
      in: ['body'],
      exists: {
        options: { checkFalsy: true },
      },
    },
    code: {
      in: ['body'],
      exists: {
        options: { checkFalsy: true },
      },
    },
  });

  static updateLanguage = checkSchema({
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
    title: {
      in: ['body'],
      optional: true,
    },
    code: {
      in: ['body'],
      optional: true,
    },
  });

  static deleteLanguage = checkSchema({
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
  });
}
