import { Card } from '@cards';
import { SORT_TYPES } from '@constants';
import { REPOSITORY_ERROR_STATUS, RepositoryError } from '@errors';

import { TARGET_CONSTANTS } from './tasks.constants';
import { Task } from './tasks.entity';
import { FindOptionsBuilder } from './tasks.repository.utils';

export class TasksRepository {
  static create = async (card: Card, userId: number, target: TARGET_CONSTANTS): Promise<Task> => {
    const isCompleted = false;
    const task = Task.create({ target, userId, card, isCompleted });
    return Task.save(task);
  };

  static update = async (id: number, props: Partial<Task>): Promise<Task> => {
    await Task.update({ id }, props);
    return this.findByIdOrFail(id);
  };

  static findByIdOrFail = async (id: number): Promise<Task> => {
    const task = await Task.findOne({
      relations: {
        card: {
          nativeWord: true,
          foreignWord: true,
        },
      },
      where: { id },
    });

    if (!task) {
      throw new RepositoryError('Task does not exists', REPOSITORY_ERROR_STATUS.NOT_FOUND);
    }

    return task;
  };

  static delete = async (id: number): Promise<void> => {
    await this.findByIdOrFail(id);
    await Task.delete({ id });
  };

  static getAllSortedAndFilteredByUserWithCount = async (
    limit: number,
    offset: number,
    sort: SORT_TYPES | undefined,
    searchWord: string | undefined,
    userId: number
  ): Promise<[Task[], number]> => {
    const findOptions = new FindOptionsBuilder()
      .applyLimitAndOffset(offset, limit)
      .applySortByDate(sort)
      .applySearchAndUserIdOnUncompletedTasks(searchWord, userId)
      .applyRelations()
      .getFindOptions();

    return Task.findAndCount(findOptions);
  };
}
