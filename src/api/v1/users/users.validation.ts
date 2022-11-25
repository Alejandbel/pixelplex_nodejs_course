import { checkSchema } from 'express-validator';

export class UsersValidation {
  static changeLanguage = checkSchema({
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
  });
}
