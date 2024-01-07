import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseAbstractService } from '../../common/base/base.service';
import { BookingEntity } from './entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { TPaginationResult } from '../../common/types/paginationResult.type';
import { CreateBookingDto } from './dto/createBooking.dto';
import { ScheduleService } from '../schedule/schedule.service';
import { UserService } from '../user/user.service';

@Injectable()
export class BookingService implements BaseAbstractService<BookingEntity> {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly repository: Repository<BookingEntity>,
    private readonly entityManager: EntityManager,
    private readonly userSerivce: UserService,
    private readonly scheduleService: ScheduleService,
  ) {}
  getList(query: any): Promise<TPaginationResult<BookingEntity>> {
    throw new Error('Method not implemented.');
  }
  getById(id: number): Promise<BookingEntity> | null {
    throw new Error('Method not implemented.');
  }
  async create(dto: CreateBookingDto): Promise<BookingEntity> {
    try {
      const [customer, schedule, validated] = await Promise.all([
        this.userSerivce.getById(dto.customerId),
        this.scheduleService.getById(dto.scheduleId),
        ScheduleService.validateOpenCloseHour(dto.fromHour, dto.toHour),
      ]);
      return await this.repository.save(dto);
    } catch (error) {
      throw new BadRequestException(JSON.stringify(error?.message ?? error));
    }
  }
  update(dto: any, em?: EntityManager | undefined): Promise<BookingEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }

  
}
