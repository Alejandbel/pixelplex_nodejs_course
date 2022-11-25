import { checkSchema } from 'express-validator';

export class CardsSanitization {
  static getAllCards = checkSchema({
    limit: {
      in: ['query'],
      toInt: true,
    },
    offset: {
      in: ['query'],
      toInt: true,
    },
    languageId: {
      in: ['query'],
      toInt: true,
    },
    orderBy: {
      optional: true,
      in: ['query'],
    },
  });

  static getCard = checkSchema({
    id: {
      in: ['params'],
      toInt: true,
    },
  });

  static addCard = checkSchema({
    nativeLanguageId: {
      in: ['body'],
      toInt: true,
    },
    foreignLanguageId: {
      in: ['body'],
      toInt: true,
    },
  });

  static updateCard = checkSchema({
    id: {
      in: ['params'],
      toInt: true,
    },
    nativeLanguageId: {
      in: ['body'],
      toInt: true,
    },
    foreignLanguageId: {
      in: ['body'],
      toInt: true,
    },
  });

  static deleteCard = checkSchema({
    id: {
      in: ['params'],
      toInt: true,
    },
  });
}
