import express from 'express';

import { logRequest, parseJson, processError, processNotFoundEndpoint } from '@middleware';

import { mountRouter as mountApiRouter } from './api';

export const app = express();

app.use(parseJson);

app.use(logRequest);

mountApiRouter(app);

app.use(processNotFoundEndpoint);
app.use(processError);
