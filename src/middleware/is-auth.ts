import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { JWT_SECRET } from '@config';
import { AppError } from '@errors';
import { KeyValueRequest, TypedJwt } from '@interfaces';

export const isAuth = <T1 extends Record<string, any>, T2 extends Record<string, any>, T3 extends Record<string, any>>(
  req: KeyValueRequest<T1, T2, T3>,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      return next(new AppError('Authorization header is missing', 400));
    }

    const [, token] = authHeader.split(' '); // 'Bearer {{token}}'

    const verifiedToken = jwt.verify(token, JWT_SECRET) as TypedJwt;

    req.user = verifiedToken.user;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError && error.message === 'invalid signature') {
      return next(new AppError('Invalid authorization token', 401));
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError('Authorization token expired', 401));
    }
    next(error);
  }
};
