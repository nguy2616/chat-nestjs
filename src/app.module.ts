import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
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
import { UserModule } from './modules/user/user.module';

const modules = [UserModule, AuthModule, ConversationModule];
@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ...modules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CreatedByMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.POST })
      .apply(UpdatedByMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.PUT })
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
