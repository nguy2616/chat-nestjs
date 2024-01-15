import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorMsgEnum } from 'src/common/enums/errorMessage.enum';
import { RoleEnum } from 'src/common/enums/role.enum';
import { mutateQuery } from 'src/common/utils/mutateQuery';
import { EntityManager, Repository } from 'typeorm';
import { BaseAbstractService } from '../../common/base/base.service';
import { TPaginationResult } from '../../common/types/paginationResult.type';
import { ScheduleService } from '../schedule/schedule.service';
import { UserService } from '../user/user.service';
import { CreateBookingDto } from './dto/createBooking.dto';
import { QueryBookingDto } from './dto/queryBooking.dto';
import { UpdateBookingDto } from './dto/updateBooking.dto';
import { BookingEntity } from './entities/booking.entity';
import { BookingMenuEntity } from './entities/bookingMenu.entity';

@Injectable()
export class BookingService implements BaseAbstractService<BookingEntity> {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly repository: Repository<BookingEntity>,
    private readonly entityManager: EntityManager,
    private readonly userSerivce: UserService,
    private readonly scheduleService: ScheduleService,
  ) {}
  async getList(
    query: QueryBookingDto,
  ): Promise<TPaginationResult<BookingEntity>> {
    const { limit, skip, sortBy, sortOrder, conditions } = mutateQuery(query);

    const data = await this.repository.findAndCount({
      where: { ...conditions },
      skip,
      take: limit,
      order: {
        [sortBy]: sortOrder,
      },
    });
    return {
      data: data[0],
      totalItems: data[1],
      perPage: limit,
      page: query.page,
      totalPages: Math.ceil(data[1] / limit),
    };
  }
  async getById(id: number): Promise<BookingEntity> {
    const data = await this.repository.findOne({
      where: { id },
      relations: ['menus'],
    });
    if (!data) throw new NotFoundException(ErrorMsgEnum.NOT_FOUND);
    return data;
  }
  async create(dto: CreateBookingDto): Promise<BookingEntity> {
    try {
      const [customer, schedule, validated] = await Promise.all([
        this.userSerivce.getById(dto.customerId),
        this.scheduleService.getById(dto.scheduleId),
        ScheduleService.validateOpenCloseHour(dto.fromHour, dto.toHour),
      ]);
      if (customer.role.roleName !== RoleEnum.CUSTOMER)
        throw new BadRequestException(ErrorMsgEnum.NOT_CUSTOMER);
      if (schedule) {
        ScheduleService.validateOpenCloseHour(schedule.openHour, dto.fromHour);
        ScheduleService.validateOpenCloseHour(dto.toHour, schedule.closeHour);
      }
      return await this.repository.save(dto);
    } catch (error) {
      throw new BadRequestException(JSON.stringify(error?.message ?? error));
    }
  }
  async update(
    dto: UpdateBookingDto,
    em?: EntityManager | undefined,
  ): Promise<BookingEntity> {
    try {
      const data = await this.getById(dto.id);
      if (dto?.fromHour && dto?.toHour)
        ScheduleService.validateOpenCloseHour(dto.fromHour, dto.toHour);
      return await this.repository.save({ ...data, ...dto });
    } catch (error) {
      throw new BadRequestException(JSON.stringify(error?.message ?? error));
    }
  }
  async delete(id: number): Promise<any> {
    try {
      const deletedData = await this.getById(id);
      return await this.entityManager.transaction(async (trx) => {
        await Promise.all([
          trx.softDelete(BookingEntity, id),
          trx.update(BookingEntity, deletedData.id, { status: false }),
          trx.softDelete(
            BookingMenuEntity,
            deletedData.menus.map((m) => m.id),
          ),
          trx.update(
            BookingMenuEntity,
            deletedData.menus.map((m) => m.id),
            {
              status: false,
            },
          ),
        ]);
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
