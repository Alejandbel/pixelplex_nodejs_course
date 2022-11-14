import { checkSchema } from 'express-validator';

export class LanguagesValidation {
  static getAllLanguages = checkSchema({
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
    orderBy: {
      in: ['query'],
      optional: true,
      isIn: {
        options: [['date', 'name']],
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
        errorMessage: 'Id is required',
        options: {
          checkFalsy: true,
        },
      },
      isInt: {
        errorMessage: 'Invalid id',
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
        errorMessage: 'Title is required',
        options: { checkFalsy: true },
      },
    },
    code: {
      in: ['body'],
      exists: {
        errorMessage: 'Code is required',
        options: { checkFalsy: true },
      },
    },
  });

  static updateLanguage = checkSchema({
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
}
