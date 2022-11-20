import { Card, ICard } from './cards.entity';

export class CardsService {
  static getAllCards = async (
    limit: number,
    offset: number,
    orderBy: 'foreign' | 'native' | 'date',
    sort: 'asc' | 'desc',
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

  static updateCard = async (id: number, props: ICard): Promise<Card> => {
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
