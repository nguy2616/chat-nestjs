import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateScheduleDto } from './createSchedule.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateScheduleDto extends PartialType(
  OmitType(CreateScheduleDto, ['dayOfWeek', 'date', 'providerId']),
) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
