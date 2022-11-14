import { checkSchema } from 'express-validator';

export class AuthValidation {
  static signUp = checkSchema({
    name: {
      exists: {
        errorMessage: 'Username is required',
        options: { checkFalsy: true },
      },
      in: ['body'],
      trim: true,
      isLength: {
        options: {
          min: 5,
          max: 256,
        },
        errorMessage: 'Invalid username length',
      },
    },
    email: {
      exists: {
        errorMessage: 'Email is required',
        options: { checkFalsy: true },
      },
      in: ['body'],
      isEmail: true,
      errorMessage: 'Invalid email',
    },
    password: {
      exists: {
        errorMessage: 'Password is required',
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
        errorMessage: 'Invalid password format',
      },
    },
  });

  static login = checkSchema({
    email: {
      exists: {
        errorMessage: 'Email is required',
        options: { checkFalsy: true },
      },
      in: ['body'],
      isEmail: {
        errorMessage: 'Invalid email format',
      },
    },
    password: {
      exists: {
        errorMessage: 'Password is required',
        options: { checkFalsy: true },
      },
    },
  });
}
