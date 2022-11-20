import { checkSchema } from 'express-validator';

export class UsersValidation {
  static changeLanguage = checkSchema({
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
  });
}
