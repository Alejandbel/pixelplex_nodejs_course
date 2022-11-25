import express from 'express';

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
    app.listen(8080, () => console.log('Listening 8080'));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

init();
