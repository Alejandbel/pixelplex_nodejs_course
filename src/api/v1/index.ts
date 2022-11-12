import * as express from 'express';
import { IRouter } from 'express';

import { mountRouter as mountAuthRouter } from './auth/auth.router';
import { mountRouter as mountLanguagesRouter } from './languages/languages.router';
import { mountRouter as mountCardsRouter } from './cards/cards.router';

const router = express.Router();

mountAuthRouter(router);
mountLanguagesRouter(router);
mountCardsRouter(router);

export function mountRouter(routing: IRouter): void {
  routing.use('/v1', router);
}
