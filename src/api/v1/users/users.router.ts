import * as express from 'express';
import { IRouter } from 'express';

import { UsersController } from './users.controller';

const router = express.Router();

router.post('/native-language', UsersController.changeLanguage);

export function mountRouter(routing: IRouter): void {
  routing.use('/users', router);
}
