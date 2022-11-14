import { NextFunction, Request, Response } from 'express';

export class UsersController {
  static changeLanguage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { languageId } = req.body;
      console.log('changeLanguage', languageId);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  };
}
