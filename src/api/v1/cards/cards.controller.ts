import { NextFunction, Response } from 'express';

import { TypedRequestBody, TypedRequestParams, TypedRequestQuery } from '@interfaces';

import { CardsService } from './cards.service';
import {
  AddCardBodyDTO,
  AddCardResponseDTO,
  DeleteCardParamsDTO,
  GetAllCardsQueryDTO,
  GetAllCardsResponseDTO,
  GetCardParamsDTO,
  GetCardResponseDTO,
  UpdateCardBodyDTO,
  UpdateCardParamsDTO,
  UpdateCardResponseDTO,
} from './cards.types';

export class CardsController {
  static getAllCards = async (
    req: TypedRequestQuery<GetAllCardsQueryDTO>,
    res: Response<GetAllCardsResponseDTO>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { limit, offset, orderBy, sort, search, languageId } = req.query;
      const userId = req.user.id;

      const [cards, total] = await CardsService.getAllCards(limit, offset, orderBy, sort, search, languageId, userId);

      res.status(200).json({
        items: cards,
        pagination: {
          offset,
          limit,
          total,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  static getCard = async (
    req: TypedRequestParams<GetCardParamsDTO>,
    res: Response<GetCardResponseDTO>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const card = await CardsService.getCard(id, userId);

      res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  };

  static addCard = async (
    req: TypedRequestBody<AddCardBodyDTO>,
    res: Response<AddCardResponseDTO>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { nativeLanguageId, foreignLanguageId, nativeWord, foreignWord } = req.body;
      const userId = req.user.id;

      const card = await CardsService.addCard(nativeLanguageId, foreignLanguageId, nativeWord, foreignWord, userId);

      res.status(201).json(card);
    } catch (error) {
      next(error);
    }
  };

  static updateCard = async (
    req: TypedRequestParams<UpdateCardParamsDTO> & TypedRequestBody<UpdateCardBodyDTO>,
    res: Response<UpdateCardResponseDTO>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const props = req.body;
      const userId = req.user.id;

      const card = await CardsService.updateCard(id, props, userId);
      res.status(200).json(card);
    } catch (error) {
      next(error);
    }
  };

  static deleteCard = async (
    req: TypedRequestParams<DeleteCardParamsDTO>,
    res: Response<void>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      await CardsService.deleteCard(id, userId);

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}
