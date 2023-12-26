import * as bcrypt from 'bcrypt';
import { FindOptionsRelations } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hashPassword: string) {
  return await bcrypt.compare(password, hashPassword);
}

export const relations: FindOptionsRelations<UserEntity> = {
  role: true,
};
