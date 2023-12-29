import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { NextFunction } from 'express';
import { decodeToken } from '../utils';

@Injectable()
export class CreatedByMiddleware implements NestMiddleware {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async use(request: any, response: any, next: NextFunction) {
    try {
      if (!request?.cookies?.Authentication) next();
      const payload = decodeToken(request.cookies['Authentication']);

      // const token = await this.cacheManager.get(`user-${payload.id.toString()}`);

      if (payload?.id && request?.body) {
        request.body = {
          ...request.body,
          createdBy: payload.id,
          updatedBy: payload.id,
        };
      }
      next();
    } catch (error) {
      Logger.debug(error);
    }
  }
}

@Injectable()
export class UpdatedByMiddleware implements NestMiddleware {
  use(request: any, response: any, next: NextFunction) {
    try {
      if (!request?.cookies?.Authentication) next();
      const payload = decodeToken(request.cookies['Authentication']);
      if (payload?.id && request?.body) {
        request.body = {
          ...request.body,
          updatedBy: payload.id,
        };
      }
      next();
    } catch (error) {
      throw new BadRequestException(error?.message ?? error);
    }
  }
}
