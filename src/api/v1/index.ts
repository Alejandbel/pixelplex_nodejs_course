import * as express from 'express';
import { IRouter } from 'express';

import { mountRouter as mountAuthRouter } from './auth/auth.router';

const router = express.Router();

mountAuthRouter(router);

export function mountRouter(routing: IRouter): void {
  routing.use('/v1', router);
}
