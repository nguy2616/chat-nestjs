import { Socket } from 'socket.io';
export interface IUser {
  id: number;
}
export interface ISocketUser extends Socket {
  user: IUser;
}
