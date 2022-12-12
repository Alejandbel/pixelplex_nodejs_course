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
}

export function processServiceError(error: ServiceError): AppError {
  const { message, status } = error;
  switch (status) {
    case SERVICE_ERROR_STATUS.EMAIL_CONFLICT: {
      return new AppError(message, 400);
    }
  }
}
