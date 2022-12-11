import { SORT_TYPES } from '@constants';
import { REPOSITORY_ERROR_STATUS, RepositoryError } from '@errors';
import { Language } from '@languages';
import { Word } from '@words';

import { CARDS_ORDER_BY } from './cards.constants';
import { Card } from './cards.entity';
import { FindOptionsBuilder } from './cards.repository.utils';

export class CardsRepository {
  static create = async (nativeWord: Word, foreignWord: Language, userId: number): Promise<Card> => {
    const card = Card.create({ nativeWord, foreignWord, userId });
    return Card.save(card);
  };

  static update = async (id: number, props: Partial<Card>): Promise<Card> => {
    await Card.update({ id }, props);
    return this.findById(id);
  };

  static findById = async (id: number): Promise<Card> => {
    const card = await Card.findOneBy({ id });

    if (!card) {
      throw new RepositoryError('Card does not exists', REPOSITORY_ERROR_STATUS.NOT_FOUND);
    }

    return card;
  };

  static delete = async (id: number): Promise<void> => {
    await this.findById(id);
    await Card.delete({ id });
  };

  static getAllSortedAndFilteredByUser = async (
    limit: number,
    offset: number,
    orderBy: CARDS_ORDER_BY | undefined,
    sort: SORT_TYPES | undefined,
    search: string | undefined,
    userId: number,
    language: Language
  ): Promise<Card[]> => {
    const findOptions = new FindOptionsBuilder()
      .applyLimitAndOffset(limit, offset)
      .applySort(sort)
      .applyOrderBy(orderBy)
      .applySearch(language, search)
      .applyUserId(userId)
      .applyRelations()
      .getFindOptions();

    return Card.find(findOptions);
  };
}
