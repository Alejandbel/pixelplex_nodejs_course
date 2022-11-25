import { NextFunction, Response } from 'express';
import { UsersRepository } from './users.repository';
import { TypedRequestBody } from '@interfaces';
import { ChangeLanguageBodyDTO, ChangeLanguageResponseDTO } from './users.types';

export class UsersController {
  static changeLanguage = async (
    req: TypedRequestBody<ChangeLanguageBodyDTO>,
    res: Response<ChangeLanguageResponseDTO>,
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
