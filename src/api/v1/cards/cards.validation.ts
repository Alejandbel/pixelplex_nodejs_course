import { checkSchema } from 'express-validator';

export class CardsValidation {
  static getAllCards = checkSchema({
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
    languageId: {
      in: ['query'],
      exists: {
        errorMessage: 'LanguageId is required',
        options: { checkFalsy: true },
      },
      isInt: {
        options: {
          min: 0,
        },
        errorMessage: 'Incorrect languageId',
      },
      toInt: true,
    },
    sort: {
      optional: true,
      in: ['query'],
      isIn: {
        options: [['asc', 'desc']],
      },
    },
    orderBy: {
      optional: true,
      in: ['query'],
      isIn: {
        options: [['foreign', 'native', 'date']],
      },
    },
    search: {
      optional: true,
      in: ['query'],
    },
  });

  static getCard = checkSchema({
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
  });

  static addCard = checkSchema({
    nativeLanguageId: {
      in: ['body'],
      exists: {
        errorMessage: 'NativeLanguageId is required',
        options: { checkFalsy: true },
      },
      optional: true,
      isInt: {
        errorMessage: 'Invalid nativeLanguageId',
        options: {
          min: 0,
        },
      },
      toInt: true,
    },
    foreignLanguageId: {
      in: ['body'],
      exists: {
        errorMessage: 'ForeignLanguageId is required',
        options: { checkFalsy: true },
      },
      optional: true,
      isInt: {
        errorMessage: 'Invalid foreignLanguageId',
        options: {
          min: 0,
        },
      },
      toInt: true,
    },
    nativeWord: {
      in: ['body'],
      exists: {
        errorMessage: 'NativeWord is required',
        options: { checkFalsy: true },
      },
    },
    foreignWord: {
      in: ['body'],
      exists: {
        errorMessage: 'ForeignWord is required',
        options: { checkFalsy: true },
      },
    },
  });

  static updateCard = checkSchema({
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
    nativeLanguageId: {
      in: ['body'],
      optional: true,
      isInt: {
        errorMessage: 'Invalid nativeLanguageId',
        options: {
          min: 0,
        },
      },
      toInt: true,
    },
    foreignLanguageId: {
      in: ['body'],
      optional: true,
      isInt: {
        errorMessage: 'Invalid foreignLanguageId',
        options: {
          min: 0,
        },
      },
      toInt: true,
    },
    nativeWord: {
      in: ['body'],
      optional: true,
    },
    foreignWord: {
      in: ['body'],
      optional: true,
    },
  });

  static deleteCard = checkSchema({
    id: {
      in: ['params'],
      isInt: {
        errorMessage: 'Invalid id',
        options: {
          min: 0,
        },
      },
      toInt: true,
    },
  });
}
