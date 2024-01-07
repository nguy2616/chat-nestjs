import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import { BaseDto } from '../../../common/base/base.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class CreateBookingMenuDto extends BaseDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  bookingId: number;

  @IsNotEmpty()
  @IsNumber()
  menuId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  memo: string;
}

export class CreateBookingDto extends BaseDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsNotEmpty()
  @IsNumber()
  scheduleId: number;

  @IsNotEmpty()
  @IsString()
  @Matches('^(0[0-9]|1[0-9]|2[0-3]):([03]0)$')
  @Length(5, 5)
  fromHour: string;

  @IsNotEmpty()
  @IsString()
  @Matches('^(0[0-9]|1[0-9]|2[0-3]):([03]0)$')
  @Length(5, 5)
  toHour: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  memo: string;

  @ApiPropertyOptional({ type: [CreateBookingMenuDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateBookingMenuDto)
  menus: CreateBookingMenuDto[];
}
