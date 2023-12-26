import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface IResponse<T> {
  data: T;
  totalItems: number;
  perPage: number;
  totalPages: number;
  page: number;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        data: data?.data ? data.data : data,
        totalItems: data?.totalItems,
        perPage: data?.perPage,
        totalPages: data?.totalPages,
        page: data?.page,
      })),
    );
  }
}
