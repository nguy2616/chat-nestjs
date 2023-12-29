import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { NextFunction } from 'express';
import { decodeToken } from '../utils';

@Injectable()
export class CreatedByMiddleware implements NestMiddleware {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  use(request: any, response: any, next: NextFunction) {
    const payload = decodeToken(request.cookies['Authentication']);

    // const token = this.cacheManager.get(`user-${payload.id.toString()}`);
    // console.log('token', token);
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
