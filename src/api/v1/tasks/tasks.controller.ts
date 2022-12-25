import { NextFunction, Response } from 'express';

import { TypedRequestBody, TypedRequestParams, TypedRequestQuery } from '@interfaces';

import { TasksService } from './tasks.service';
import {
  AddTaskBodyDTO,
  AddTaskResponseDTO,
  CompleteTaskBodyDTO,
  CompleteTaskParamsDTO,
  CompleteTaskResponseDTO,
  GetStatisticQueryDTO,
  GetStatisticResponseDTO,
  GetTaskParamsDTO,
  GetTaskResponseDTO,
  GetUncompletedTasksQueryDTO,
  GetUncompletedTasksResponseDTO,
} from './tasks.types';

export class TasksController {
  static getUncompletedTasks = async (
    req: TypedRequestQuery<GetUncompletedTasksQueryDTO>,
    res: Response<GetUncompletedTasksResponseDTO>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { limit, offset, sort, searchWord } = req.query;
      const userId = req.user.id;

      const [tasks, total] = await TasksService.getUncompletedTasks(limit, offset, sort, searchWord, userId);

      res.status(200).json({
        items: tasks,
        pagination: {
          offset,
          limit,
          total,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  static getStatistic = async (
    req: TypedRequestQuery<GetStatisticQueryDTO>,
    res: Response<GetStatisticResponseDTO>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { dateBegin, dateEnd, languageId } = req.query;
      const userId = req.user.id;

      const statistic = await TasksService.getStatistic(dateBegin, dateEnd, languageId, userId);

      res.status(200).json(statistic);
    } catch (error) {
      next(error);
    }
  };

  static getTask = async (
    req: TypedRequestParams<GetTaskParamsDTO>,
    res: Response<GetTaskResponseDTO>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const task = await TasksService.getTask(id, userId);

      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  };

  static addTask = async (
    req: TypedRequestBody<AddTaskBodyDTO>,
    res: Response<AddTaskResponseDTO>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { languageId, target } = req.body;
      const userId = req.user.id;

      const task = await TasksService.addTask(languageId, target, userId);

      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  };

  static completeTask = async (
    req: TypedRequestParams<CompleteTaskParamsDTO> & TypedRequestBody<CompleteTaskBodyDTO>,
    res: Response<CompleteTaskResponseDTO>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { answer } = req.body;
      const userId = req.user.id;

      const result = await TasksService.completeTask(id, answer, userId);

      res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  };
}
