import { checkSchema } from 'express-validator';

import { SORT_TYPES } from '@constants';

import { CARDS_ORDER_BY } from './cards.constants';

export class CardsValidation {
  static getAllCards = checkSchema({
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
    sort: {
      optional: true,
      in: ['query'],
      isIn: {
        options: [[SORT_TYPES.ASC, SORT_TYPES.DESC]],
      },
    },
    orderBy: {
      optional: true,
      in: ['query'],
      isIn: {
        options: [[CARDS_ORDER_BY.FOREIGN, CARDS_ORDER_BY.NATIVE, CARDS_ORDER_BY.DATE]],
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
        options: { checkFalsy: true },
      },
      isInt: {
        options: {
          min: 0,
        },
      },
    },
  });

  static addCard = checkSchema({
    nativeLanguageId: {
      in: ['body'],
      exists: {
        options: { checkFalsy: true },
      },
      optional: true,
      isInt: {
        options: {
          min: 0,
        },
      },
    },
    foreignLanguageId: {
      in: ['body'],
      exists: {
        options: { checkFalsy: true },
      },
      optional: true,
      isInt: {
        options: {
          min: 0,
        },
      },
    },
    nativeWord: {
      in: ['body'],
      exists: {
        options: { checkFalsy: true },
      },
    },
    foreignWord: {
      in: ['body'],
      exists: {
        options: { checkFalsy: true },
      },
    },
  });

  static updateCard = checkSchema({
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
    nativeLanguageId: {
      in: ['body'],
      optional: true,
      isInt: {
        options: {
          min: 0,
        },
      },
    },
    foreignLanguageId: {
      in: ['body'],
      optional: true,
      isInt: {
        options: {
          min: 0,
        },
      },
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
        options: {
          min: 0,
        },
      },
    },
  });
}
