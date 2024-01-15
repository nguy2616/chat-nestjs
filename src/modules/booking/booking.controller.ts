import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ControllerEnum } from '../../common/enums/controller.enum';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/createBooking.dto';
import { QueryBookingDto } from './dto/queryBooking.dto';
import { UpdateBookingDto } from './dto/updateBooking.dto';

@ApiTags(ControllerEnum.BOOKING)
@Controller(ControllerEnum.BOOKING)
export class BookingController {
  constructor(private readonly service: BookingService) {}

  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.service.create(dto);
  }

  @Get()
  getList(@Query() query: QueryBookingDto) {
    return this.service.getList(query);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateBookingDto) {
    return this.service.update(dto);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
