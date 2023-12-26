import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from 'src/environment';
import { UserService } from 'src/modules/user/user.service';
import { TokenPayload } from '../dto/login.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: TokenPayload) {
    return this.userService.getById(payload.id);
  }
}
