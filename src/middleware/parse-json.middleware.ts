import express, { NextFunction, Request, Response } from 'express';

import { AppError } from '@errors';

export const parseJson = (req: Request, res: Response, next: NextFunction): void => {
  express.json()(req, res, (err) => {
    if (err) {
      next(new AppError('Invalid json body', 400));
    }
    next();
  });
};
