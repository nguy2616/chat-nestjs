import { IntersectionType } from '@nestjs/swagger';
import { CreateScheduleDto } from './createSchedule.dto';
import { UpdateScheduleDto } from './updateSchedule.dto';
import { PaginationDto } from '../../../common/base/basePagination.dto';

export class QueryScheduleDto extends IntersectionType(
  PaginationDto,
  UpdateScheduleDto,
) {}
