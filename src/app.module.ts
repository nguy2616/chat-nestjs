import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CreatedByMiddleware,
  UpdatedByMiddleware,
} from './common/middlewares/actor.middleware';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { dataSourceOptions } from './config/orm.config';
import { AuthModule } from './modules/auth/auth.module';
import { ConversationModule } from './modules/conversation/conversation.module';
import { WsModule } from './modules/gateway/ws.module';
import { MessageModule } from './modules/message/message.module';
import { RedisModule } from './modules/redis/redis.module';
import { UserModule } from './modules/user/user.module';

const modules = [
  TypeOrmModule.forRoot(dataSourceOptions),
  EventEmitterModule.forRoot(),
  RedisModule,
  WsModule,
  UserModule,
  AuthModule,
  ConversationModule,
  MessageModule,
];
@Module({
  imports: [...modules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CreatedByMiddleware)
      .exclude({ path: 'auth/(.*)', method: RequestMethod.POST })
      .forRoutes({ path: '*', method: RequestMethod.POST })
      .apply(UpdatedByMiddleware)
      .exclude({ path: 'auth/(.*)', method: RequestMethod.POST })
      .forRoutes({ path: '*', method: RequestMethod.PUT })
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
