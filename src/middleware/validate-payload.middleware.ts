import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';
import { KeyValueRequest } from '@interfaces';

export const validatePayload = (req: KeyValueRequest, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: 'Bad request', errors: errors.array() });
    return;
  }
  next();
};
