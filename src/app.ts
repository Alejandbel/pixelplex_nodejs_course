import express from 'express';

import { APPLICATION_CONFIG } from '@config';
import { logRequest, parseJson, processError, processNotFoundEndpoint } from '@middleware';

import { mountRouter as mountApiRouter } from './api';

const app = express();

app.use(parseJson);

app.use(logRequest);

mountApiRouter(app);

app.use(processNotFoundEndpoint);
app.use(processError);

async function init(): Promise<void> {
  try {
    app.listen(APPLICATION_CONFIG.PORT, () => console.log(`Listening on ${APPLICATION_CONFIG.PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

init();
