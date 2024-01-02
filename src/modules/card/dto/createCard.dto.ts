import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { BaseDto } from '../../../common/base/base.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCardDto extends BaseDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(12)
  expireMonth: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(new Date().getFullYear())
  expireYear: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(100)
  @Max(999)
  cvv: string;

  @IsNotEmpty()
  @IsString()
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  cardHolder: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
