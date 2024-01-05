import { IoAdapter } from '@nestjs/platform-socket.io';
import { NextFunction } from 'express';
import { decodeToken } from 'src/common/utils';
import { ISocketUser } from '../../common/types/socketUser.interface';
import { Logger } from '@nestjs/common';

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
    if (!client.handshake.headers.cookies) return false;
    const cookies = client.handshake.headers.cookies as string;
    const token = cookies.split('=')[1];
    if (!token) return false;
    const payload = decodeToken(token);
    client.user = {
      id: payload.id,
    };
    return true;
  }
}
