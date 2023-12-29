// ws.gateway.ts
import { Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ISocketUser } from 'src/common/types/socketUser.interface';
import { ConversationService } from '../conversation/conversation.service';
import { ConversationEntity } from '../conversation/entities/conversation.entity';
import { MessageEntity } from '../message/entities/message.entity';
import { MessageService } from '../message/message.service';
import {
  ConversationEnum,
  MessageEnum,
  OnListenEnum,
} from './enums/message.enum';
import { WsSessionManager } from './ws.session';
@WebSocketGateway(8000, {
  cors: {
    origin: '*',
    credentials: true,
  },
  pingInterval: 10000,
  pingTimeout: 15000,
})
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly messageService: MessageService,
    private eventEmitter: EventEmitter2,
    private readonly sessions: WsSessionManager,
  ) {}
  @WebSocketServer() server: Server;

  handleConnection(client: ISocketUser) {
    this.sessions.setSession(client.user.id, client);

    Logger.debug(`Client connected: ${client.user.id}`);
  }

  handleDisconnect(client: ISocketUser) {
    this.sessions.removeSession(client.user.id);
    Logger.debug(`Client disconnected: ${client.user.id}`);
  }

  @SubscribeMessage('createMessage')
  // @UseGuards(JwtAuthenticationGuard)
  // handleCreateMessage(@MessageBody() data: CreateMessageDto) {
  //   console.log(data);
  //   return `Hello, ${data}!`;
  // }
  @OnEvent(MessageEnum.CREATE)
  handleCreateMessage(
    @MessageBody() data: MessageEntity,
    // @ConnectedSocket() client: ISocketUser,
  ) {
    const client = this.sessions.getSession(data.authorId);
    if (client) client.emit(OnListenEnum.MESSAGE, data);

    const recipentId =
      data.authorId === data.conversation.creatorId
        ? data.conversation.recipentId
        : data.conversation.creatorId;
    const recipentSocket = this.sessions.getSession(recipentId);

    if (recipentSocket) recipentSocket.emit(OnListenEnum.MESSAGE, data);
  }

  @OnEvent(ConversationEnum.CREATE)
  handleCreateConversation(
    @MessageBody() data: ConversationEntity,
    @ConnectedSocket() client: ISocketUser,
  ) {
    const recipentSocket = this.sessions.getSession(data.recipentId);
    if (recipentSocket) recipentSocket.emit(OnListenEnum.CONVERSATION, data);
    client.emit(OnListenEnum.CONVERSATION, data);
  }
}
