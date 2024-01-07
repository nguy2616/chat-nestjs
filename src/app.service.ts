import { Injectable } from '@nestjs/common';
import { hostname } from 'os';
@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World! from ${hostname()}`;
  }
}
