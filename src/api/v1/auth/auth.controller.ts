import { NextFunction, Request, Response } from 'express';

export class AuthController {
  static signUpPOST = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password, name } = req.body;
      console.log('signUp', email, password, name);
      res.status(200).send('ok');
    } catch (error) {
      next(error);
    }
  };

  static loginPOST = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;
      console.log('login', email, password);
      res.status(200).send('ok');
    } catch (error) {
      next(error);
    }
  };

  static logoutPOST = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('logout');
      res.status(200).send('ok');
    } catch (error) {
      next(error);
    }
  };
}
