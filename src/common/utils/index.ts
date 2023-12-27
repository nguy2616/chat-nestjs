import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from 'src/environment';
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hashPassword: string) {
  return await bcrypt.compare(password, hashPassword);
}

export function decodeToken(token: string) {
  const decoded = jwt.verify(token, JWT_SECRET) as any;

  return decoded;
}
