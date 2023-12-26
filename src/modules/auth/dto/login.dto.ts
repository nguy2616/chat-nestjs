import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/user/dto/createUser.dto';

export class LoginDto extends PickType(CreateUserDto, ['email', 'password']) {}

export interface TokenPayload {
  id: number;
  roleId: number;
}
