import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction) {
    const startTime = Date.now();
    response.on('finish', () => {
      const { method, originalUrl } = request;
      const { statusCode, statusMessage } = response;
      const requestParramaters = {} as any;
      Object.entries(request.body).length &&
        (requestParramaters.body = request.body);
      Object.entries(request.query).length &&
        (requestParramaters.query = request.query);
      Object.entries(requestParramaters).length &&
        this.logger.log(JSON.stringify(requestParramaters));
      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage} ${
        Date.now() - startTime
      }ms`;
      if (statusCode >= 200 && statusCode < 400) {
        this.logger.log(message);
      } else {
        this.logger.error(message);
      }
    });
    next();
  }
}

export default LoggerMiddleware;
