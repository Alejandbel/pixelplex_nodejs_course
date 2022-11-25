import { checkSchema } from 'express-validator';

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
          min: 5,
          max: 256,
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
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
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
