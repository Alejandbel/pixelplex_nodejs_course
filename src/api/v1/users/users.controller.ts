import { NextFunction, Response } from 'express';

import { TypedRequestBody } from '@interfaces';

import { UsersService } from './users.service';
import { ChangeLanguageBodyDTO, ChangeLanguageResponseDTO } from './users.types';

export class UsersController {
  static changeLanguage = async (
    req: TypedRequestBody<ChangeLanguageBodyDTO>,
    res: Response<ChangeLanguageResponseDTO>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { languageId } = req.body;
      const userId = req.user.id;

      await UsersService.changeLanguage(userId, languageId);

      const message = 'Language changed successfully';
      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  };
}
