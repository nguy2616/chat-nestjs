import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ControllerEnum } from 'src/common/enums/controller.enum';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import JwtAuthenticationGuard from './guard/jwt.guard';
import { LocalGuard } from './guard/local.guard';

@ApiTags(ControllerEnum.AUTH)
@Controller(ControllerEnum.AUTH)
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.service.register(dto);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async logIn(
    @Request() req: any,
    @Response() res: any,
    @Body() dto: LoginDto,
  ) {
    const { user } = req;
    const cookie = await this.service.getCookieWithJwtToken(user);

    res.setHeader('Set-Cookie', cookie);
    return res.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('logout')
  async logOut(@Response() res: any) {
    res.setHeader('Set-Cookie', `Authentication=; HttpOnly; Path=/; Max-Age=0`);
    return res.sendStatus(200);
  }
}
