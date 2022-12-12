import { AppError } from './app.error';

export class ServiceError extends Error {
  constructor(message: string, public readonly status: SERVICE_ERROR_STATUS) {
    super(message);
  }
}

export function isServiceError(error: unknown): error is ServiceError {
  return error instanceof ServiceError;
}

export enum SERVICE_ERROR_STATUS {
  EMAIL_CONFLICT,
  INCORRECT_EMAIL,
  INCORRECT_PASSWORD,
}

export function processServiceError(error: ServiceError): AppError {
  const { message, status } = error;
  let statusCode: number;
  switch (status) {
    case SERVICE_ERROR_STATUS.EMAIL_CONFLICT: {
      statusCode = 400;
      break;
    }
    case SERVICE_ERROR_STATUS.INCORRECT_EMAIL: {
      statusCode = 400;
      break;
    }
    case SERVICE_ERROR_STATUS.INCORRECT_PASSWORD: {
      statusCode = 401;
      break;
    }
  }
  return new AppError(message, statusCode);
}
