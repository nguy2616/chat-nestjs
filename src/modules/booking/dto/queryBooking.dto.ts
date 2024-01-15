import { IntersectionType, OmitType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/base/basePagination.dto';
import { UpdateBookingDto } from './updateBooking.dto';

export class QueryBookingDto extends IntersectionType(
  PaginationDto,
  OmitType(UpdateBookingDto, ['menus']),
) {}
