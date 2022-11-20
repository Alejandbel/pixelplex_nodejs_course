import { NextFunction, Request, Response } from 'express';
import { UsersRepository } from './users.repository';

export class UsersController {
  static changeLanguage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { languageId } = req.body;
      await UsersRepository.changeLanguage(languageId);
      const message = 'Language changed successfully';
      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  };
}
