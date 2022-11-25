import * as express from 'express';
import { IRouter } from 'express';

import { TasksController } from './tasks.controller';
import { TasksValidation } from './tasks.validation';
import { validatePayload } from '@middleware';
import { TasksSanitization } from './tasks.sanitization';

const router = express.Router();

router.get(
  '/',
  TasksValidation.getUncompletedTasks,
  validatePayload,
  TasksSanitization.getUncompletedTasks,
  TasksController.getUncompletedTasks
);

router.get(
  '/statistic',
  TasksValidation.getStatistic,
  validatePayload,
  TasksSanitization.getStatistic,
  TasksController.getStatistic
);

router.get('/:id', TasksValidation.getTask, validatePayload, TasksSanitization.getTask, TasksController.getTask);

router.post('/', TasksValidation.addTask, validatePayload, TasksSanitization.addTask, TasksController.addTask);

router.post(
  '/:id',
  TasksValidation.completeTask,
  validatePayload,
  TasksSanitization.completeTask,
  TasksController.completeTask
);

export function mountRouter(routing: IRouter): void {
  routing.use('/tasks', router);
}
