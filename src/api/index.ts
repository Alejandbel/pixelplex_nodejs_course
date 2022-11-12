import * as express from 'express';
import { IRouter } from 'express';

import { mountRouter as mountV1Router } from './v1';

const router = express.Router();

mountV1Router(router);

export function mountRouter(routing: IRouter): void {
  routing.use('/api', router);
}
