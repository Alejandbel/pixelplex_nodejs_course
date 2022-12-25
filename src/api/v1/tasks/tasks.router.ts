import { IRouter } from 'express';
import * as express from 'express';

import { isAuth, validatePayload } from '@middleware';

import { TasksController } from './tasks.controller';
import { TasksSanitization } from './tasks.sanitization';
import { TasksValidation } from './tasks.validation';

const router = express.Router();

router.get(
  '/',
  isAuth,
  TasksValidation.getUncompletedTasks,
  validatePayload,
  TasksSanitization.getUncompletedTasks,
  TasksController.getUncompletedTasks
);

router.get(
  '/statistic',
  isAuth,
  TasksValidation.getStatistic,
  validatePayload,
  TasksSanitization.getStatistic,
  TasksController.getStatistic
);

router.get(
  '/:id',
  isAuth,
  TasksValidation.getTask,
  validatePayload,
  TasksSanitization.getTask,
  TasksController.getTask
);

router.post('/', isAuth, TasksValidation.addTask, validatePayload, TasksSanitization.addTask, TasksController.addTask);

router.post(
  '/:id',
  isAuth,
  TasksValidation.completeTask,
  validatePayload,
  TasksSanitization.completeTask,
  TasksController.completeTask
);

export function mountRouter(routing: IRouter): void {
  routing.use('/tasks', router);
}
