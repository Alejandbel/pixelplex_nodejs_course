import { Server as HTTPServer } from 'http';

import * as jwt from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';

import { JWT_SECRET } from '@config';
import { applyLanguageEvent, EVENT_ROOMS } from '@events';

const addToAuthRoomIfAuthorized = (socket: Socket): void => {
  socket.on('auth', (data) => {
    try {
      const { token } = data;

      if (!token) {
        return;
      }

      jwt.verify(token, JWT_SECRET);

      socket.join(EVENT_ROOMS.AUTHORIZED);
    } catch (error) {
      console.log(error);
      return;
    }
  });
};

export const applySocketConnections = (server: HTTPServer): void => {
  const io = new Server(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    addToAuthRoomIfAuthorized(socket);
  });

  applyLanguageEvent(io);
};
