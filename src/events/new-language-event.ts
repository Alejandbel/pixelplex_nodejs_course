import { Server, Socket } from 'socket.io';

import { Language } from '@languages';

import { EVENT_ROOMS, EVENT_NAMES } from './events.constants';

import { eventEmitter } from './index';

export const applyLanguageEvent = (io: Server): void => {
  eventEmitter.on(EVENT_NAMES.NEW_LANGUAGE, (language: Language) => {
    io.to(EVENT_ROOMS.AUTHORIZED).emit(
      'message',
      JSON.stringify({ event: EVENT_NAMES.NEW_LANGUAGE, payload: { title: language.title } })
    );
  });
};
