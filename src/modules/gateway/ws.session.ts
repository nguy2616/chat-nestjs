import { Injectable } from '@nestjs/common';
import { ISocketUser } from 'src/common/types/socketUser.interface';

@Injectable()
export class WsSessionManager {
  private readonly sessions: Map<number, ISocketUser> = new Map();

  getSession(id: number) {
    return this.sessions.get(id);
  }

  setSession(id: number, socket: ISocketUser) {
    this.sessions.set(id, socket);
  }

  removeSession(id: number) {
    this.sessions.delete(id);
  }

  getSessions() {
    return this.sessions;
  }
}
