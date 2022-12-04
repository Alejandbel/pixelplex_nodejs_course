import { IRouter } from 'express';
import * as express from 'express';

import { validatePayload } from '@middleware';

import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post('/signup', AuthValidation.signUp, validatePayload, AuthController.signUp);
router.post('/login', AuthValidation.login, validatePayload, AuthController.login);
router.post('/logout', AuthController.logout);

export function mountRouter(routing: IRouter): void {
  routing.use('/auth', router);
}
