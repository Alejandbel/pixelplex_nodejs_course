import { FindManyOptions, ILike } from 'typeorm';

import { SORT_TYPES } from '@constants';

import { LANGUAGES_ORDER_BY } from './languages.constants';
import { Language } from './languages.entity';

export class FindOptionsBuilder {
  private findOptions: FindManyOptions<Language> = {};

  private sort: SORT_TYPES | undefined;

  applyLimitAndOffset = (offset: number, limit: number): FindOptionsBuilder => {
    this.findOptions.skip = offset;
    this.findOptions.take = limit;
    return this;
  };

  applySort = (sort: SORT_TYPES | undefined): FindOptionsBuilder => {
    this.sort = sort || SORT_TYPES.ASC;
    return this;
  };

  applyOrderBy = (orderBy: LANGUAGES_ORDER_BY | undefined): FindOptionsBuilder => {
    if (!this.sort) {
      return this;
    }

    if (orderBy === LANGUAGES_ORDER_BY.DATE) {
      this.findOptions.order = {
        createdAt: this.sort,
      };
    } else if (orderBy === LANGUAGES_ORDER_BY.NAME) {
      this.findOptions.order = {
        title: this.sort,
      };
    }

    return this;
  };

  applySearch = (search: string | undefined): FindOptionsBuilder => {
    if (search) {
      this.findOptions.where = {
        title: ILike(`%${search}%`),
      };
    }
    return this;
  };

  getFindOptions = (): FindManyOptions<Language> => {
    return this.findOptions;
  };
}
