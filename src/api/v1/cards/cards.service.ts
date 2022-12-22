import { SORT_TYPES } from '@constants';
import { SERVICE_ERROR_STATUS, ServiceError } from '@errors';
import { LanguagesRepository } from '@languages';
import { areWordsUnique, WordsRepository } from '@words';

import { CARDS_ORDER_BY } from './cards.constants';
import { CardsRepository } from './cards.repository';
import { CardDTO } from './cards.service.mapper';
import { ICard } from './cards.types';

export class CardsService {
  static getAllCards = async (
    limit: number,
    offset: number,
    orderBy: CARDS_ORDER_BY | undefined,
    sort: SORT_TYPES | undefined,
    search: string | undefined,
    languageId: number,
    userId: number
  ): Promise<[CardDTO[], number]> => {
    const language = await LanguagesRepository.findByIdOrFail(languageId);

    const [cards, count] = await CardsRepository.getAllSortedAndFilteredByUserWithCount(
      limit,
      offset,
      orderBy,
      sort,
      search,
      userId,
      language
    );

    return [cards.map((card) => new CardDTO(card)), count];
  };

  static getCard = async (id: number, userId: number): Promise<CardDTO> => {
    const card = await CardsRepository.findByIdOrFail(id);

    if (card.userId != userId) {
      throw new ServiceError(SERVICE_ERROR_STATUS.NOT_ALLOWED);
    }

    return new CardDTO(card);
  };

  static addCard = async (
    nativeLanguageId: number,
    foreignLanguageId: number,
    nativeWord: string,
    foreignWord: string,
    userId: number
  ): Promise<CardDTO> => {
    await Promise.all([
      LanguagesRepository.findByIdOrFail(nativeLanguageId),
      LanguagesRepository.findByIdOrFail(foreignLanguageId),
    ]);

    const nativeWordToCreate = { word: nativeWord, languageId: nativeLanguageId, userId };
    const foreignWordToCreate = { word: foreignWord, languageId: foreignLanguageId, userId };

    if (!(await areWordsUnique([nativeWordToCreate, foreignWordToCreate]))) {
      throw new ServiceError(SERVICE_ERROR_STATUS.WORD_NOT_UNIQUE);
    }

    const [createdNativeWord, createdForeignWord] = await WordsRepository.createMany([
      nativeWordToCreate,
      foreignWordToCreate,
    ]);

    const card = await CardsRepository.create(createdNativeWord, createdForeignWord, userId);

    return new CardDTO(card);
  };

  static updateCard = async (id: number, props: Partial<ICard>, userId: number): Promise<CardDTO> => {
    let { nativeLanguageId, nativeWord, foreignLanguageId, foreignWord } = props;

    const card = await CardsRepository.findByIdOrFail(id);

    if (card.userId != userId) {
      throw new ServiceError(SERVICE_ERROR_STATUS.NOT_ALLOWED);
    }

    if (nativeLanguageId) {
      await LanguagesRepository.findByIdOrFail(nativeLanguageId);
    } else {
      nativeLanguageId = card.nativeWord.languageId;
    }

    if (foreignLanguageId) {
      await LanguagesRepository.findByIdOrFail(foreignLanguageId);
    } else {
      foreignLanguageId = card.foreignWord.languageId;
    }

    if (!nativeWord) {
      nativeWord = card.nativeWord.word;
    }

    if (!foreignWord) {
      foreignWord = card.foreignWord.word;
    }

    const nativeWordProps = {
      word: nativeWord,
      languageId: nativeLanguageId,
    };
    const foreignWordProps = {
      word: foreignWord,
      languageId: foreignLanguageId,
    };

    if (
      !(await areWordsUnique([
        { ...nativeWordProps, userId },
        { ...foreignWordProps, userId },
      ]))
    ) {
      throw new ServiceError(SERVICE_ERROR_STATUS.WORD_NOT_UNIQUE);
    }

    await WordsRepository.updateMany([card.nativeWord.id, card.foreignWord.id], [nativeWordProps, foreignWordProps]);

    return new CardDTO(await CardsRepository.findByIdOrFail(id));
  };

  static deleteCard = async (id: number, userId: number): Promise<void> => {
    const card = await CardsRepository.findByIdOrFail(id);

    if (card.userId != userId) {
      throw new ServiceError(SERVICE_ERROR_STATUS.NOT_ALLOWED);
    }

    await CardsRepository.delete(id);
  };
}
