import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorMsgEnum } from 'src/common/enums/errorMessage.enum';
import { JWT_EXPIRATION_TIME } from 'src/environment';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { comparePassword } from '../user/utils';
import { LoginDto, TokenPayload } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  async validateUser(dto: LoginDto) {
    try {
      const user = await this.userService.getByEmail(dto.email);
      if (!user) throw new NotFoundException(ErrorMsgEnum.NOT_FOUND);
      const isMatch = await comparePassword(dto.password, user.password);
      if (!isMatch)
        throw new BadRequestException(ErrorMsgEnum.INVALID_PASSWORD);
      return user;
    } catch (error) {
      throw new BadRequestException(error?.message ?? error);
    }
  }

  async getCookieWithJwtToken(user: UserEntity) {
    const payload: TokenPayload = { id: user.id, roleId: user.roleId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${JWT_EXPIRATION_TIME}`;
  }
}
