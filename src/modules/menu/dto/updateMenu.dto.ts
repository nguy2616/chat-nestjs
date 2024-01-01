import { PartialType } from '@nestjs/swagger';
import { CreateMenuDto } from './createMenu.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
