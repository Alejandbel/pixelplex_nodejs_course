import * as express from 'express';
import { IRouter } from 'express';

import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { validatePayload } from '@middleware';

const router = express.Router();

router.post('/signup', AuthValidation.signUp, validatePayload, AuthController.signUp);
router.post('/login', AuthValidation.login, validatePayload, AuthController.login);
router.post('/logout', AuthController.logout);

export function mountRouter(routing: IRouter): void {
  routing.use('/auth', router);
}
