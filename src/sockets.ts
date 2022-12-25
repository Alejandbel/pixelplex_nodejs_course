import { Server } from 'socket.io';

import { applyLanguageEvent } from '@events';

import { server } from './server';

export const applySocketConnections = (): void => {
  const io = new Server(server, { cors: { origin: '*' } });
  applyLanguageEvent(io);
};
