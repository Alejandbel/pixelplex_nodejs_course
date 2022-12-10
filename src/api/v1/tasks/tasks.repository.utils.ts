import { FindManyOptions, ILike } from 'typeorm';

import { SORT_TYPES } from '@constants';

import { TARGET_CONSTANTS } from './tasks.constants';
import { Task } from './tasks.entity';

export class FindOptionsBuilder {
  private findOptions: FindManyOptions<Task> = {};

  applyRelations = (): FindOptionsBuilder => {
    this.findOptions.relations = {
      card: true,
    };
    return this;
  };

  applyLimitAndOffset = (offset: number, limit: number): FindOptionsBuilder => {
    this.findOptions.skip = offset;
    this.findOptions.take = limit;
    return this;
  };

  applySort = (sort: SORT_TYPES | undefined): FindOptionsBuilder => {
    if (!sort) {
      return this;
    }

    this.findOptions.order = {
      createdAt: sort,
    };

    return this;
  };

  applySearchAndUserId = (search: string | undefined, userId: number): FindOptionsBuilder => {
    if (!search) {
      this.findOptions.where = [
        {
          isCompleted: false,
          target: TARGET_CONSTANTS.TO_FOREIGN,
          userId: userId,
          card: {
            nativeWord: ILike(`%${search}%`),
          },
        },
        {
          isCompleted: false,
          target: TARGET_CONSTANTS.TO_NATIVE,
          userId: userId,
          card: {
            foreignWord: ILike(`%${search}%`),
          },
        },
      ];
      return this;
    }

    this.findOptions.where = {
      isCompleted: false,
      userId: userId,
    };

    return this;
  };

  getFindOptions = (): FindManyOptions<Task> => {
    return this.findOptions;
  };
}
