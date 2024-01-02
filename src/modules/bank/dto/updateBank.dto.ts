import { PartialType } from '@nestjs/swagger';
import { CreateBankDto } from './createBank.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBankDto extends PartialType(CreateBankDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
