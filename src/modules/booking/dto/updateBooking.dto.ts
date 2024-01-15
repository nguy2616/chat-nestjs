import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreateBookingDto, CreateBookingMenuDto } from './createBooking.dto';

export class UpdateBookingMenuDto extends PartialType(
  OmitType(CreateBookingMenuDto, ['bookingId']),
) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class UpdateBookingDto extends PartialType(
  OmitType(CreateBookingDto, ['customerId', 'scheduleId', 'menus']),
) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiPropertyOptional({ type: [UpdateBookingMenuDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateBookingMenuDto)
  menus: UpdateBookingMenuDto[];
}
