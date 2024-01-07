import { ApiTags } from '@nestjs/swagger';
import { ControllerEnum } from '../../common/enums/controller.enum';
import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/createBooking.dto';

@ApiTags(ControllerEnum.BOOKING)
@Controller(ControllerEnum.BOOKING)
export class BookingController {
  constructor(private readonly service: BookingService) {}

  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.service.create(dto);
  }
}
