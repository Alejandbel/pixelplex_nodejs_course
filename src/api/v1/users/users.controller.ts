import { NextFunction, Response } from 'express';
import { UsersRepository } from './users.repository';
import { TypedRequestBody } from '@interfaces';

export class UsersController {
  static changeLanguage = async (
    req: TypedRequestBody<{ languageId: number }>,
    res: Response<{ message: string }>,
    next: NextFunction
  ): Promise<void> => {
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
