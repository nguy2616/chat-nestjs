import { Injectable } from '@nestjs/common';
import * as os from 'os';
@Injectable()
export class AppService {
  getHello(): string {
    // return `Hello World! from ${hostname()}`;
    return this.getNetworkIP();
  }

  getNetworkIP = () => {
    const interfaces = os.networkInterfaces();
    for (const devName in interfaces) {
      const iface = interfaces[devName];
      if (!iface) continue;
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (
          alias.family === 'IPv4' &&
          alias.address !== '127.0.0.1' &&
          !alias.internal
        ) {
          return alias.address;
        }
      }
    }
    return '0.0.0.0';
  };
}
