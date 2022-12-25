import * as http from 'http';

import { APPLICATION_CONFIG } from '@config';

import { app } from './app';
import { AppDataSource } from './data-source';
import { applySocketConnections } from './sockets';

export const server = http.createServer(app);

async function init(): Promise<void> {
  try {
    await AppDataSource.initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
    applySocketConnections();
    server.listen(APPLICATION_CONFIG.PORT, () => console.log(`Listening on ${APPLICATION_CONFIG.PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

init();
