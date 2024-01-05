import { Logger } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { NextFunction } from 'express';
import { decodeToken } from 'src/common/utils';
import { ISocketUser } from '../../common/types/socketUser.interface';

export class WsAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.use((socket: any, next: NextFunction) => {
      const isAuthenticated = WsAdapter.validate(socket);
      if (isAuthenticated) return next();
      Logger.error('Authentication error');
      return next(new Error('Authentication error'));
    });
    return server;
  }

  static validate(client: ISocketUser) {
    if (!client.handshake.headers.cookie) return false;
    const cookie = client.handshake.headers.cookie as string;

    const token = cookie.split('=')[1];
    if (!token) return false;
    const payload = decodeToken(token);
    client.user = {
      id: payload.id,
    };
    return true;
  }
}
