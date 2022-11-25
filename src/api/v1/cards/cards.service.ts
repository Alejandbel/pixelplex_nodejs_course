import { SORT_TYPES } from '@constants';

import { CARDS_ORDER_BY } from './cards.constants';
import { Card } from './cards.entity';
import { ICard } from './cards.types';

export class CardsService {
  static getAllCards = async (
    limit: number,
    offset: number,
    orderBy: CARDS_ORDER_BY,
    sort: SORT_TYPES,
    search: string,
    languageId: number
  ): Promise<Card[]> => {
    console.log('getAllCards', limit, offset, orderBy, sort, search, languageId);
    return [
      {
        id: 1,
        nativeLanguageId: 1,
        foreignLanguageId: 2,
        nativeWord: 'house',
        foreignWord: 'дом',
      },
      {
        id: 2,
        nativeLanguageId: 1,
        foreignLanguageId: 2,
        nativeWord: 'street',
        foreignWord: 'улица',
      },
    ];
  };

  static getCard = async (id: number): Promise<Card> => {
    console.log('getCard', id);
    return {
      id: id,
      nativeLanguageId: 1,
      foreignLanguageId: 2,
      nativeWord: 'house',
      foreignWord: 'дом',
    };
  };

  static addCard = async (
    nativeLanguageId: number,
    foreignLanguageId: number,
    nativeWord: string,
    foreignWord: string
  ): Promise<Card> => {
    console.log('addCard', nativeLanguageId, foreignLanguageId, nativeWord, foreignWord);
    return new Card(nativeLanguageId, foreignLanguageId, nativeWord, foreignWord);
  };

  static updateCard = async (id: number, props: Partial<ICard>): Promise<Card> => {
    console.log('updateCard', id, props);
    return {
      id: 1,
      nativeLanguageId: 1,
      foreignLanguageId: 2,
      nativeWord: 'house',
      foreignWord: 'дом',
    };
  };

  static deleteCard = async (id: number): Promise<void> => {
    console.log('deleteCard', id);
  };
}
