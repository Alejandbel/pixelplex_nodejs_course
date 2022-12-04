import { checkSchema } from 'express-validator';

import { NAME_VALIDATION_CONSTANTS, PASSWORD_VALIDATION_CONSTANTS } from './auth.constants';

export class AuthValidation {
  static signUp = checkSchema({
    name: {
      exists: {
        options: { checkFalsy: true },
      },
      in: ['body'],
      trim: true,
      isLength: {
        options: {
          min: NAME_VALIDATION_CONSTANTS.MIN_LENGTH,
          max: NAME_VALIDATION_CONSTANTS.MAX_LENGTH,
        },
      },
    },
    email: {
      exists: {
        options: { checkFalsy: true },
      },
      in: ['body'],
      isEmail: true,
    },
    password: {
      exists: {
        options: { checkFalsy: true },
      },
      in: ['body'],
      isStrongPassword: {
        options: {
          minLength: PASSWORD_VALIDATION_CONSTANTS.MIN_LENGTH,
          minLowercase: PASSWORD_VALIDATION_CONSTANTS.MIN_LOWERCASE_CHARACTERS,
          minUppercase: PASSWORD_VALIDATION_CONSTANTS.MIN_UPPERCASE_CHARACTERS,
          minNumbers: PASSWORD_VALIDATION_CONSTANTS.MIN_NUMBERS,
          minSymbols: PASSWORD_VALIDATION_CONSTANTS.MIN_SYMBOLS,
        },
      },
    },
  });

  static login = checkSchema({
    email: {
      exists: {
        options: { checkFalsy: true },
      },
      in: ['body'],
      isEmail: true,
    },
    password: {
      exists: {
        options: { checkFalsy: true },
      },
    },
  });
}
