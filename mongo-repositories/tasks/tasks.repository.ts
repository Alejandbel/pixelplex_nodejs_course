import { Types } from 'mongoose';

import { SORT_TYPES } from '../common.constants';
import { Card } from '../models/card.model';

import { TARGET_CONSTANTS } from './tasks.constants';
import { ITask } from './tasks.inteface';

export class TasksRepository {
  static create = async (cardId: Types.ObjectId, userId: Types.ObjectId, target: TARGET_CONSTANTS): Promise<ITask> => {
    const card = await Card.findById(cardId);

    if (!card) {
      throw new Error('Card not found');
    }

    const task = {
      isCompleted: false,
      target: target,
    };

    card.tasks.push(task);

    return (await card.save()).tasks.at(-1);
  };

  static update = async (id: Types.ObjectId, props: Partial<ITask>): Promise<ITask> => {
    await Card.findOneAndUpdate(
      {
        tasks: {
          $elemMatch: { _id: id },
        },
      },
      {
        $set: {
          'tasks.$': props,
        },
      }
    );

    return this.findByIdOrFail(id);
  };

  static findByIdOrFail = async (id: Types.ObjectId): Promise<ITask> => {
    const task = Card.tasks.id(id);

    if (!task) {
      throw new Error('Task does not exists');
    }

    return task;
  };

  static delete = async (id: Types.ObjectId): Promise<void> => {
    await this.findByIdOrFail(id);
    await Card.updateOne(
      {},
      {
        $pull: { tasks: { _id: id } },
      }
    );
  };

  static getAllSortedAndFilteredByUserWithCount = async (
    limit: number,
    offset: number,
    sort: SORT_TYPES | undefined,
    search: string | undefined,
    userId: Types.ObjectId
  ): Promise<[ITask[], number]> => {
    let query = Card.find({ user: userId });

    const findOptions = search
      ? {
          $or: [
            { nativeWord: search, tasks: { target: TARGET_CONSTANTS.TO_FOREIGN } },
            { foreignWord: search, tasks: { target: TARGET_CONSTANTS.TO_NATIVE } },
          ],
        }
      : {};

    const count = await query.countDocuments(findOptions).exec();

    query = query.find(findOptions);

    const tasks = (await query.select('tasks').exec())
      .reduce((previousTasks, currentCard): ITask[] => {
        return previousTasks.concat(currentCard.tasks);
      }, [])
      .slice(offset, offset + limit);

    if (sort) {
      const sortSide = sort === SORT_TYPES.ASC ? -1 : 1;

      tasks.sort((firstTask, secondTask) => {
        if (firstTask.createdAt < secondTask.createdAt) {
          return sortSide;
        }

        if (secondTask.createdAt > firstTask.createdAt) {
          return -sortSide;
        }

        return 0;
      });
    }

    return [tasks, count];
  };
}
