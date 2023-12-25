import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { json, urlencoded } from 'express';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exceptions/all-exception.filter';
import { swaggerConfig } from './config/swagger.config';
import { API_PREFIX, PORT } from './environment';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cors({ credentials: true, origin: true }));
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.setGlobalPrefix(API_PREFIX);

  await swaggerConfig(app);
  await app.listen(+PORT);
}
bootstrap();
