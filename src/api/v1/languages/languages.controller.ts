import { NextFunction, Request, Response } from 'express';

export class LanguagesController {
  static getAllLanguages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { limit, offset, orderBy, sort, search } = req.query;
      console.log('getAllLanguages', limit, offset, orderBy, sort, search);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  };

  static getLanguage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      console.log('getLanguage', id);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  };

  static addLanguage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { title, code } = req.body;
      console.log('addLanguage', title, code);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  };

  static updateLanguage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const props = req.body;
      console.log('updateLanguage', id, props);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  };

  static deleteLanguage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      console.log('deleteLanguage', id);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  };
}
