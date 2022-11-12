import * as express from 'express';
import { IRouter } from 'express';

import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/signup', AuthController.signUpPOST);
router.post('/login', AuthController.loginPOST);
router.post('/logout', AuthController.logoutPOST);

export function mountRouter(routing: IRouter): void {
  routing.use('/auth', router);
}
