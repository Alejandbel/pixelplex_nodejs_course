import * as express from 'express';
import { IRouter } from 'express';

import { UsersController } from './users.controller';
import { UsersValidation } from './users.validation';
import { validatePayload } from '@middleware';

const router = express.Router();

router.post('/native-language', UsersValidation.changeLanguage, validatePayload, UsersController.changeLanguage);

export function mountRouter(routing: IRouter): void {
  routing.use('/users', router);
}
