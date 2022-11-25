import { checkSchema } from 'express-validator';

export class LanguagesSanitization {
  static getAllLanguages = checkSchema({
    limit: {
      in: ['query'],
      toInt: true,
    },
    offset: {
      in: ['query'],
      toInt: true,
    },
  });

  static getLanguage = checkSchema({
    id: {
      in: ['params'],
      toInt: true,
    },
  });

  static updateLanguage = checkSchema({
    id: {
      in: ['params'],
      toInt: true,
    },
  });

  static deleteLanguage = checkSchema({
    id: {
      in: ['params'],
      toInt: true,
    },
  });
}
