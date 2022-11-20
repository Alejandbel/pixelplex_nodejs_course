import { NextFunction, Request, Response } from 'express';
import { CardsService } from './cards.service';

export class CardsController {
  static getAllCards = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { limit, offset, orderBy, sort, search, languageId } = req.query as any;
      const cards = await CardsService.getAllCards(limit, offset, orderBy, sort, search, languageId);
      res.status(200).json({
        items: cards,
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

  static getCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params as unknown as { id: number };
      const card = await CardsService.getCard(id);
      res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  };

  static addCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { nativeLanguageId, foreignLanguageId, nativeWord, foreignWord } = req.body;
      const card = await CardsService.addCard(nativeLanguageId, foreignLanguageId, nativeWord, foreignWord);
      res.status(201).json(card);
    } catch (error) {
      next(error);
    }
  };

  static updateCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params as unknown as { id: number };
      const props = req.body;
      const card = await CardsService.updateCard(id, props);
      res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  };

  static deleteCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params as unknown as { id: number };
      await CardsService.deleteCard(id);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}
