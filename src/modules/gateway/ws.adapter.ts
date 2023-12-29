import { IoAdapter } from '@nestjs/platform-socket.io';
import { NextFunction } from 'express';
import { decodeToken } from 'src/common/utils';

export class WsAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.use((socket: any, next: NextFunction) => {
      const token = socket.handshake.headers.cookies.split('=')[1];

      if (token) {
        const payload = decodeToken(token);
        socket.user = {
          id: payload.id,
        };
        return next();
      }
      return next(new Error('Authentication error'));
    });
    return server;
  }
}
