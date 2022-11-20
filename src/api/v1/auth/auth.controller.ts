import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { TypedRequestBody } from '@interfaces';

export class AuthController {
  static signUp = async (
    req: TypedRequestBody<{ email: string; password: string; name: string }>,
    res: Response<{ token: string }>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, password, name } = req.body;
      const token = await AuthService.signUp(email, password, name);
      res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  };

  static login = async (
    req: TypedRequestBody<{ email: string; password: string }>,
    res: Response<{ token: string }>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  static logout = async (req: Request, res: Response<{ message: string }>, next: NextFunction): Promise<void> => {
    try {
      await AuthService.logout();
      const message = 'Successful logout';
      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  };
}
