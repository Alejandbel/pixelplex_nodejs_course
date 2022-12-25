import { AppError } from './app.error';

export class ServiceError extends Error {
  constructor(public readonly status: SERVICE_ERROR_STATUS) {
    super();
  }
}

export function isServiceError(error: unknown): error is ServiceError {
  return error instanceof ServiceError;
}

export enum SERVICE_ERROR_STATUS {
  EMAIL_CONFLICT,
  INCORRECT_EMAIL,
  INCORRECT_PASSWORD,
  EMAIL_NOT_FOUND,
  NOT_ALLOWED,
  CODE_NOT_UNIQUE,
  WORD_NOT_UNIQUE,
}

export function processServiceError(error: ServiceError): AppError {
  const { status } = error;
  let statusCode: number;
  let message: string;
  switch (status) {
    case SERVICE_ERROR_STATUS.EMAIL_CONFLICT: {
      message = 'Email already exists';
      statusCode = 400;
      break;
    }
    case SERVICE_ERROR_STATUS.INCORRECT_EMAIL: {
      message = 'Email is incorrect';
      statusCode = 400;
      break;
    }
    case SERVICE_ERROR_STATUS.INCORRECT_PASSWORD: {
      message = 'Wrong password';
      statusCode = 401;
      break;
    }
    case SERVICE_ERROR_STATUS.EMAIL_NOT_FOUND: {
      message = 'User with this email does not exists';
      statusCode = 404;
      break;
    }
    case SERVICE_ERROR_STATUS.CODE_NOT_UNIQUE: {
      message = 'Language with this code already exists';
      statusCode = 400;
      break;
    }
    case SERVICE_ERROR_STATUS.NOT_ALLOWED: {
      message = 'You are not allowed to do this';
      statusCode = 403;
      break;
    }
    case SERVICE_ERROR_STATUS.WORD_NOT_UNIQUE: {
      message = 'Word already exists';
      statusCode = 400;
      break;
    }
  }
  return new AppError(message, statusCode);
}
