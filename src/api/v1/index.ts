import * as express from 'express';
import { IRouter } from 'express';

import { mountRouter as mountAuthRouter } from './auth/auth.router';
import { mountRouter as mountCardsRouter } from './cards/cards.router';
import { mountRouter as mountLanguagesRouter } from './languages/languages.router';
import { mountRouter as mountTasksRouter } from './tasks/tasks.router';
import { mountRouter as mountUsersRouter } from './users/users.router';

const router = express.Router();

mountAuthRouter(router);
mountLanguagesRouter(router);
mountCardsRouter(router);
mountTasksRouter(router);
mountUsersRouter(router);

export function mountRouter(routing: IRouter): void {
  routing.use('/v1', router);
}
