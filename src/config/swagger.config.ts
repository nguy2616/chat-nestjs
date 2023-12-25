import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_PATH, VERSION } from 'src/environment';

export const swaggerConfig = async (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Chat app API')
    .setDescription('API Gateway')
    .setVersion(VERSION)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'id-token',
    )
    .addSecurityRequirements('id-token');
  const document = SwaggerModule.createDocument(app, options.build());
  SwaggerModule.setup(SWAGGER_PATH, app, document);
};
