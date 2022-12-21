import { SORT_TYPES } from '@constants';
import { ParamsId } from '@types';

import { CARDS_ORDER_BY } from './cards.constants';
import { CardDTO } from './cards.service.mapper';

export interface ICard {
  nativeLanguageId: number;
  foreignLanguageId: number;
  nativeWord: string;
  foreignWord: string;
}

export type GetAllCardsQueryDTO = {
  limit: number;
  offset: number;
  orderBy: CARDS_ORDER_BY;
  sort: SORT_TYPES;
  search: string;
  languageId: number;
};
export type GetAllCardsResponseDTO = {
  items: CardDTO[];
  pagination: {
    offset: number;
    limit: number;
    total: number;
  };
};

export type UpdateCardResponseDTO = CardDTO;
export type UpdateCardParamsDTO = ParamsId;
export type UpdateCardBodyDTO = Partial<ICard>;

export type DeleteCardParamsDTO = ParamsId;

export type AddCardBodyDTO = Required<ICard>;
export type AddCardResponseDTO = CardDTO;

export type GetCardParamsDTO = ParamsId;
export type GetCardResponseDTO = CardDTO;
