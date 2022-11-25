import { Card } from './cards.entity';
import { SORT_TYPES } from '@constants';
import { CARDS_ORDER_BY } from './cards.constants';

export interface ICard {
  nativeLanguageId: number;
  foreignLanguageId: number;
  nativeWord: string;
  foreignWord: string;
}

type ParamsId = { id: number };

export type GetAllCardsQueryDTO = {
  limit: number;
  offset: number;
  orderBy: CARDS_ORDER_BY;
  sort: SORT_TYPES;
  search: string;
  languageId: number;
};
export type GetAllCardsResponseDTO = {
  items: Card[];
  pagination: {
    offset: number;
    limit: number;
    total: number;
  };
};

export type UpdateCardResponseDTO = Card;
export type UpdateCardParamsDTO = ParamsId;
export type UpdateCardBodyDTO = Partial<ICard>;

export type DeleteCardParamsDTO = ParamsId;

export type AddCardBodyDTO = Required<ICard>;
export type AddCardResponseDTO = Card;

export type GetCardParamsDTO = ParamsId;
export type GetCardResponseDTO = Card;
