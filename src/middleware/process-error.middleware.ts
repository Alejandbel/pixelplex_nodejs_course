import { NextFunction, Request, Response } from 'express';

import { isAppError } from '@errors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const processError = (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (isAppError(error)) {
    const { message, statusCode } = error;
    res.status(statusCode).json({ message });
    return;
  }
  console.error(error);
  res.status(500).json({ message: 'Server error' });
};
