import * as express from 'express';
import { IRouter } from 'express';

import { TasksController } from './tasks.controller';
import { TasksValidation } from './tasks.validation';
import { validatePayload } from '@middleware';

const router = express.Router();

router.get('/', TasksValidation.getUncompletedTasks, validatePayload, TasksController.getUncompletedTasks);
router.get('/statistic', TasksValidation.getStatistic, validatePayload, TasksController.getStatistic);
router.get('/:id', TasksValidation.getTask, validatePayload, TasksController.getTask);
router.post('/', TasksValidation.addTask, validatePayload, TasksController.addTask);
router.post('/:id', TasksValidation.completeTask, validatePayload, TasksController.completeTask);

export function mountRouter(routing: IRouter): void {
  routing.use('/tasks', router);
}
