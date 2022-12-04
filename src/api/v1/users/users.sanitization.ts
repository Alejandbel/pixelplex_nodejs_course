import { checkSchema } from 'express-validator';

export class UsersSanitization {
  static changeLanguage = checkSchema({
    languageId: {
      in: ['body'],
      toInt: true,
    },
  });
}
