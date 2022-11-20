import { NextFunction, Response } from 'express';
import { CardsService } from './cards.service';
import { TypedRequestBody, TypedRequestParams, TypedRequestQuery } from '@interfaces';
import { Card, ICard } from './cards.entity';

export class CardsController {
  static getAllCards = async (
    req: TypedRequestQuery<{
      limit: number;
      offset: number;
      orderBy: 'foreign' | 'native' | 'date';
      sort: 'asc' | 'desc';
      search: string;
      languageId: number;
    }>,
    res: Response<{
      items: Card[];
      pagination: {
        offset: number;
        limit: number;
        total: number;
      };
    }>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { limit, offset, orderBy, sort, search, languageId } = req.query;
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

  static getCard = async (
    req: TypedRequestParams<{ id: number }>,
    res: Response<Card>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const card = await CardsService.getCard(id);
      res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  };

  static addCard = async (
    req: TypedRequestBody<Required<ICard>>,
    res: Response<Card>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { nativeLanguageId, foreignLanguageId, nativeWord, foreignWord } = req.body;
      const card = await CardsService.addCard(nativeLanguageId, foreignLanguageId, nativeWord, foreignWord);
      res.status(201).json(card);
    } catch (error) {
      next(error);
    }
  };

  static updateCard = async (
    req: TypedRequestParams<{ id: number }> & TypedRequestBody<ICard>,
    res: Response<Card>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const props = req.body;
      const card = await CardsService.updateCard(id, props);
      res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  };

  static deleteCard = async (
    req: TypedRequestParams<{ id: number }>,
    res: Response<void>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      await CardsService.deleteCard(id);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}
