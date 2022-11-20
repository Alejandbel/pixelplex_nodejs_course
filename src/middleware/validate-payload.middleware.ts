import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';
import { KeyValueRequest } from '@interfaces';

export const validatePayload = <
  T1 extends Record<string, any>,
  T2 extends Record<string, any>,
  T3 extends Record<string, any>
>(
  req: KeyValueRequest<T1, T2, T3>,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: 'Bad request', errors: errors.array() });
    return;
  }
  next();
};
