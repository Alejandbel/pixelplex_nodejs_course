import { NextFunction, Request, Response } from 'express';

export class TasksController {
  static getUncompletedTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { limit, offset, sort, searchWord } = req.query;
      console.log('getUncompletedTasks', limit, offset, sort, searchWord);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  };

  static getStatistic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { dateBegin, dateEnd, languageId } = req.query;
      console.log('getStatistic', dateBegin, dateEnd, languageId);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  };

  static getTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      console.log('getTask', id);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  };

  static addTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { languageId, target } = req.body;
      console.log('addTask', languageId, target);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  };

  static completeTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { answer } = req.body;
      console.log('completeTask', id, answer);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  };
}
