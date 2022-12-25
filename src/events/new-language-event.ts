import { Server } from 'socket.io';

import { eventEmitter } from './index';

export const applyLanguageEvent = (io: Server): void => {
  eventEmitter.on('new-language', () => {
    io.sockets.sockets.forEach((client) => client.send(JSON.stringify({ event: 'new-language' })));
  });
};
