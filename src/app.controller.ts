import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateScheduleDto } from './modules/schedule/dto/createSchedule.dto';
import { UpdateScheduleDto } from './modules/schedule/dto/updateSchedule.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health-check')
  getHello(): string {
    return this.appService.getHello();
  }
}
