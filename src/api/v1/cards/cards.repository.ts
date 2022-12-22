import { SORT_TYPES } from '@constants';
import { REPOSITORY_ERROR_STATUS, RepositoryError } from '@errors';
import { Language } from '@languages';
import { Word, WordsRepository } from '@words';

import { CARDS_ORDER_BY } from './cards.constants';
import { Card } from './cards.entity';
import { FindOptionsBuilder } from './cards.repository.utils';

export class CardsRepository {
  static create = async (nativeWord: Word, foreignWord: Word, userId: number): Promise<Card> => {
    const card = Card.create({ nativeWord, foreignWord, userId });
    return Card.save(card);
  };

  static update = async (id: number, props: Partial<Card>): Promise<Card> => {
    await Card.update({ id }, props);
    return this.findByIdOrFail(id);
  };

  static findByIdOrFail = async (id: number): Promise<Card> => {
    const card = await Card.findOne({ relations: { nativeWord: true, foreignWord: true }, where: { id } });

    if (!card) {
      throw new RepositoryError('Card does not exists', REPOSITORY_ERROR_STATUS.NOT_FOUND);
    }

    return card;
  };

  static delete = async (id: number): Promise<void> => {
    const card = await this.findByIdOrFail(id);
    await Promise.all([WordsRepository.delete(card.nativeWord.id), WordsRepository.delete(card.foreignWord.id)]);
  };

  static getAllSortedAndFilteredByUserWithCount = async (
    limit: number,
    offset: number,
    orderBy: CARDS_ORDER_BY | undefined,
    sort: SORT_TYPES | undefined,
    search: string | undefined,
    userId: number,
    language: Language
  ): Promise<[Card[], number]> => {
    const findOptions = new FindOptionsBuilder()
      .applyLimitAndOffset(offset, limit)
      .applySort(sort)
      .applyOrderBy(orderBy)
      .applySearch(language, search)
      .applyUserId(userId)
      .applyRelations()
      .getFindOptions();

    return Card.findAndCount(findOptions);
  };
}
