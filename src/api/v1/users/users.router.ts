import { IRouter } from 'express';
import * as express from 'express';

import { validatePayload } from '@middleware';

import { UsersController } from './users.controller';
import { UsersSanitization } from './users.sanitization';
import { UsersValidation } from './users.validation';

const router = express.Router();

router.post(
  '/native-language',
  UsersValidation.changeLanguage,
  validatePayload,
  UsersSanitization.changeLanguage,
  UsersController.changeLanguage
);

export function mountRouter(routing: IRouter): void {
  routing.use('/users', router);
}
