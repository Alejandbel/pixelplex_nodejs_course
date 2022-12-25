import { Server } from 'socket.io';

import { Language } from '@languages';

import { eventEmitter } from './index';

export const applyLanguageEvent = (io: Server): void => {
  eventEmitter.on('new-language', (language: Language) => {
    io.sockets.sockets.forEach((client) =>
      client.send(JSON.stringify({ event: 'new-language', payload: { title: language.title } }))
    );
  });
};
