import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseDto } from '../../../common/base/base.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBankDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  branchCode: string;

  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @IsString()
  accountName: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
