import { NextFunction, Response } from 'express';
import { TasksService } from './tasks.service';
import { TypedRequestBody, TypedRequestParams, TypedRequestQuery } from '@interfaces';
import { Task } from './tasks.entity';
import { TARGET_CONSTANTS } from './tasks.constants';

export class TasksController {
  static getUncompletedTasks = async (
    req: TypedRequestQuery<{ limit: number; offset: number; sort: 'asc' | 'desc'; searchWord: string }>,
    res: Response<{
      items: Task[];
      pagination: {
        offset: number;
        limit: number;
        total: number;
      };
    }>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { limit, offset, sort, searchWord } = req.query;
      const tasks = await TasksService.getUncompletedTasks(limit, offset, sort, searchWord);
      res.status(200).json({
        items: tasks,
        pagination: {
          offset,
          limit,
          total: 10,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  static getStatistic = async (
    req: TypedRequestQuery<{ dateBegin: Date; dateEnd: Date; languageId: number }>,
    res: Response<{ correct: number; incorrect: number }>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { dateBegin, dateEnd, languageId } = req.query;
      const statistic = await TasksService.getStatistic(dateBegin, dateEnd, languageId);
      res.status(200).json(statistic);
    } catch (error) {
      next(error);
    }
  };

  static getTask = async (
    req: TypedRequestParams<{ id: number }>,
    res: Response<Task>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const task = await TasksService.getTask(id);
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  };

  static addTask = async (
    req: TypedRequestBody<{ languageId: number; target: TARGET_CONSTANTS }>,
    res: Response<Task>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { languageId, target } = req.body;
      const task = await TasksService.addTask(languageId, target);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  };

  static completeTask = async (
    req: TypedRequestParams<{ id: number }> & TypedRequestBody<{ answer: string }>,
    res: Response<{ result: 'CORRECT' | 'INCORRECT' }>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { answer } = req.body;
      const result = await TasksService.completeTask(id, answer);
      res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  };
}
