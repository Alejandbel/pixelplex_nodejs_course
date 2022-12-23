import { Equal, FindManyOptions, ILike } from 'typeorm';

import { SORT_TYPES } from '@constants';
import { Language } from '@languages';

import { CARDS_ORDER_BY } from './cards.constants';
import { Card } from './cards.entity';

export class FindOptionsBuilder {
  private findOptions: FindManyOptions<Card> = {};

  private sort: SORT_TYPES | undefined;

  applyRelations = (): FindOptionsBuilder => {
    this.findOptions.relations = {
      nativeWord: true,
      foreignWord: true,
    };
    return this;
  };

  applyLimitAndOffset = (offset: number, limit: number): FindOptionsBuilder => {
    this.findOptions.skip = offset;
    this.findOptions.take = limit;
    return this;
  };

  applySort = (sort: SORT_TYPES | undefined): FindOptionsBuilder => {
    this.sort = sort || SORT_TYPES.ASC;
    return this;
  };

  applyOrderBy = (orderBy: CARDS_ORDER_BY | undefined): FindOptionsBuilder => {
    if (!this.sort) {
      return this;
    }

    switch (orderBy) {
      case CARDS_ORDER_BY.NATIVE:
        this.findOptions.order = {
          nativeWord: {
            word: this.sort,
          },
        };
        break;
      case CARDS_ORDER_BY.FOREIGN:
        this.findOptions.order = {
          foreignWord: {
            word: this.sort,
          },
        };
        break;
      case CARDS_ORDER_BY.DATE:
        this.findOptions.order = {
          createdAt: this.sort,
        };
        break;
    }

    return this;
  };

  applySearch = (language: Language, search: string | undefined): FindOptionsBuilder => {
    if (search) {
      this.findOptions.where = [
        {
          foreignWord: {
            language: Equal(language.id),
            word: ILike(`%${search}%`),
          },
        },
        {
          nativeWord: {
            language: Equal(language.id),
            word: ILike(`%${search}%`),
          },
        },
      ];
    } else {
      this.findOptions.where = [
        {
          foreignWord: {
            language: Equal(language.id),
          },
        },
        {
          nativeWord: {
            language: Equal(language.id),
          },
        },
      ];
    }

    return this;
  };

  applyUserId = (userId: number): FindOptionsBuilder => {
    if (Array.isArray(this.findOptions.where)) {
      for (const prop of this.findOptions.where) {
        prop.userId = Equal(userId);
      }
    }

    return this;
  };

  getFindOptions = (): FindManyOptions<Card> => {
    return this.findOptions;
  };
}
