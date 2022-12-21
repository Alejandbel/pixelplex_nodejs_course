import { NextFunction, Response } from 'express';

import { AppError } from '@errors';
import { KeyValueRequest } from '@interfaces';
import { USER_ROLES } from '@users';

export const checkRoles =
  <T1 extends Record<string, any>, T2 extends Record<string, any>, T3 extends Record<string, any>>(
    roles: USER_ROLES[]
  ): ((req: KeyValueRequest<T1, T2, T3>, res: Response, next: NextFunction) => void) =>
  (req, res, next) => {
    try {
      if (!req.user) {
        next(new AppError('You are not authorized', 401));
        return;
      }

      const role = req.user.role;

      if (!roles.includes(role)) {
        next(new AppError('You are not allowed to do this', 403));
      }

      next();
    } catch (error) {
      next(error);
    }
  };
