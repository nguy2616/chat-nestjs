import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { decodeToken } from '../utils';

@Injectable()
export class CreatedByMiddleware implements NestMiddleware {
  use(request: any, response: any, next: NextFunction) {
    const payload = decodeToken(request.cookies['Authentication']);
    if (payload?.id && request?.body) {
      request.body = {
        ...request.body,
        createdBy: payload.id,
        updatedBy: payload.id,
      };
    }
    next();
  }
}

@Injectable()
export class UpdatedByMiddleware implements NestMiddleware {
  use(request: any, response: any, next: NextFunction) {
    const payload = decodeToken(request.cookies['Authentication']);
    if (payload?.id && request?.body) {
      request.body = {
        ...request.body,
        updatedBy: payload.id,
      };
    }
    next();
  }
}
