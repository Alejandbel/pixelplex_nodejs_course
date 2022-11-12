import { NextFunction, Request, Response } from 'express';

export class CardsController {
  static getAllCards = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { limit, offset, orderBy, sort, search, languageId } = req.query;
      console.log('getAllCards', limit, offset, orderBy, sort, search, languageId);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  };

  static getCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      console.log('getCards', id);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  };

  static addCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { nativeLanguageId, foreignLanguageId, nativeWord, foreignWord } = req.body;
      console.log('addCard', nativeLanguageId, foreignLanguageId, nativeWord, foreignWord);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  };

  static updateCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const props = req.body;
      console.log('updateCard', id, props);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  };

  static deleteCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      console.log('deleteCard', id);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  };
}
