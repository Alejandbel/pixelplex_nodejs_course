import * as express from 'express';
import { IRouter } from 'express';

import { TasksController } from './tasks.controller';

const router = express.Router();

router.get('/', TasksController.getUncompletedTasks);
router.get('/statistic', TasksController.getStatistic);
router.get('/:id', TasksController.getTask);
router.post('/', TasksController.addTask);
router.post('/:id', TasksController.completeTask);

export function mountRouter(routing: IRouter): void {
  routing.use('/tasks', router);
}
