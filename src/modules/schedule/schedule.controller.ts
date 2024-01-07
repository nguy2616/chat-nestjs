import { ApiTags } from '@nestjs/swagger';
import { ControllerEnum } from '../../common/enums/controller.enum';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/createSchedule.dto';
import { QueryScheduleDto } from './dto/querySchedule.dto';
import { UpdateScheduleDto } from './dto/updateSchedule.dto';
import JwtAuthenticationGuard from '../auth/guard/jwt.guard';

@ApiTags(ControllerEnum.SCHEDULE)
@Controller(ControllerEnum.SCHEDULE)
@UseGuards(JwtAuthenticationGuard)
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}

  @Post()
  create(@Body() dto: CreateScheduleDto) {
    return this.service.create(dto);
  }

  @Get()
  getList(@Query() query: QueryScheduleDto) {
    return this.service.getList(query);
  }

  @Put(':id')
  update(@Body() dto: UpdateScheduleDto) {
    return this.service.update(dto);
  }

  @Delete(':id')
  delete(@Query('id') id: number) {
    return this.service.delete(id);
  }

  @Get(':id')
  getById(@Query('id') id: number) {
    return this.service.getById(id);
  }
}
