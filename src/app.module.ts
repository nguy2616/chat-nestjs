import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { dataSourceOptions } from './config/orm.config';
import { UserModule } from './modules/user/user.module';

const modules = [UserModule];
@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ...modules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
