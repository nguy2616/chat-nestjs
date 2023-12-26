import { EntityManager } from 'typeorm';
import { TPaginationResult } from '../types/paginationResult.type';

export abstract class BaseAbstractService<T> {
  abstract getList(query: any): Promise<TPaginationResult<T>>;
  abstract getById(id: number): Promise<T>;
  abstract create(dto: any, em?: EntityManager): Promise<T>;
  abstract update(dto: any, em?: EntityManager): Promise<T>;
  abstract delete(id: number): Promise<any>;
}
