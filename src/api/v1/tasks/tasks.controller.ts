import { NextFunction, Request, Response } from 'express';
import { TasksService } from './tasks.service';

export class TasksController {
  static getUncompletedTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { limit, offset, sort, searchWord } = req.query as any;
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

  static getStatistic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { dateBegin, dateEnd, languageId } = req.query as any;
      const statistic = await TasksService.getStatistic(dateBegin, dateEnd, languageId);
      res.status(200).json(statistic);
    } catch (error) {
      next(error);
    }
  };

  static getTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params as any;
      const task = await TasksService.getTask(id);
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  };

  static addTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { languageId, target } = req.body;
      const task = await TasksService.addTask(languageId, target);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  };

  static completeTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params as any;
      const { answer } = req.body;
      const result = await TasksService.completeTask(id, answer);
      res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  };
}
