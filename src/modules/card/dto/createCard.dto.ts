import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { BaseDto } from '../../../common/base/base.dto';

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
  @IsNumberString()
  @MinLength(3)
  @MaxLength(3)
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
