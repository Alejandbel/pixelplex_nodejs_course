import { NextFunction, Request, Response } from 'express';
import { LanguagesService } from './languages.service';

export class LanguagesController {
  static getAllLanguages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { limit, offset, orderBy, sort, search } = req.query as any;
      const languages = await LanguagesService.getAllLanguages(limit, offset, orderBy, sort, search);
      res.status(200).json({
        items: languages,
        pagination: {
          offset,
          limit,
          total: 10,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  static getLanguage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params as any;
      const language = await LanguagesService.getLanguage(id);
      res.status(200).json(language);
    } catch (error) {
      next(error);
    }
  };

  static addLanguage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { title, code } = req.body;
      const language = await LanguagesService.addLanguage(title, code);
      res.status(201).json(language);
    } catch (error) {
      next(error);
    }
  };

  static updateLanguage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params as any;
      const props = req.body;
      const language = await LanguagesService.updateLanguage(id, props);
      res.status(200).json(language);
    } catch (error) {
      next(error);
    }
  };

  static deleteLanguage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params as any;
      await LanguagesService.deleteLanguage(id);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}
