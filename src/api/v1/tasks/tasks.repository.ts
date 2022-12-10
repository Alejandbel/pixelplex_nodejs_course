import { Card } from '@cards';
import { SORT_TYPES } from '@constants';
import { AppError } from '@errors';

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
    const currentTask = await this.findById(id);
    await Task.update({ id }, { ...currentTask, ...props });
    return this.findById(id);
  };

  static findById = async (id: number): Promise<Task> => {
    const task = await Task.findOneBy({ id });

    if (!task) {
      throw new AppError('Task does not exists', 404);
    }

    return task;
  };

  static delete = async (id: number): Promise<void> => {
    await this.findById(id);
    await Task.delete({ id });
  };

  static getAllSortedAndFilteredByUser = async (
    limit: number,
    offset: number,
    sort: SORT_TYPES,
    searchWord: string,
    userId: number
  ): Promise<Task[]> => {
    const findOptions = new FindOptionsBuilder()
      .applyLimitAndOffset(limit, offset)
      .applySort(sort)
      .applySearchAndUserId(searchWord, userId)
      .applyRelations()
      .getFindOptions();

    return Task.find(findOptions);
  };
}
