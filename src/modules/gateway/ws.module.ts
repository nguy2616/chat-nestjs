import { Module } from '@nestjs/common';
import { ConversationModule } from '../conversation/conversation.module';
import { MessageModule } from '../message/message.module';
import { WsGateway } from './ws.gateway';
import { WsSessionManager } from './ws.session';

@Module({
  imports: [ConversationModule, MessageModule],
  providers: [WsGateway, WsSessionManager],
  exports: [WsGateway, WsSessionManager],
})
export class WsModule {}
