import { NextFunction, Response } from 'express';

import { AppError } from '@errors';
import { KeyValueRequest } from '@interfaces';
import { USER_ROLES } from '@users';

export const isAdmin = <T1 extends Record<string, any>, T2 extends Record<string, any>, T3 extends Record<string, any>>(
  req: KeyValueRequest<T1, T2, T3>,
  res: Response,
  next: NextFunction
): void => {
  try {
    const role = req.user?.role;
    if (role !== USER_ROLES.ADMIN) {
      next(new AppError('You are not allowed to do this', 403));
    }
  } catch (error) {
    next(error);
  }
};
