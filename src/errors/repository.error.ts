import { AppError } from './app.error';

export class RepositoryError extends Error {
  constructor(message: string, public readonly status: REPOSITORY_ERROR_STATUS) {
    super(message);
  }
}

export function isRepositoryError(error: unknown): error is RepositoryError {
  return error instanceof RepositoryError;
}

export enum REPOSITORY_ERROR_STATUS {
  NOT_FOUND,
}

export function processRepositoryError(error: RepositoryError): AppError {
  const { message, status } = error;
  switch (status) {
    case REPOSITORY_ERROR_STATUS.NOT_FOUND: {
      return new AppError(message, 404);
    }
  }
}
