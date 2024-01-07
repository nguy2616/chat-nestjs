import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseAbstractService } from '../../common/base/base.service';
import { ScheduleEntity } from './entities/schedule.entity';
import { EntityManager, Repository } from 'typeorm';
import { TPaginationResult } from '../../common/types/paginationResult.type';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateScheduleDto } from './dto/createSchedule.dto';
import { UserService } from '../user/user.service';
import { RoleEnum } from '../../common/enums/role.enum';
import { ErrorMsgEnum } from '../../common/enums/errorMessage.enum';
import { QueryScheduleDto } from './dto/querySchedule.dto';
import { mutateQuery } from '../../common/utils/mutateQuery';
import { UpdateScheduleDto } from './dto/updateSchedule.dto';

@Injectable()
export class ScheduleService implements BaseAbstractService<ScheduleEntity> {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly repository: Repository<ScheduleEntity>,
    private readonly userSerivce: UserService,
    private readonly entityManager: EntityManager,
  ) {}
  async getList(
    query: QueryScheduleDto,
  ): Promise<TPaginationResult<ScheduleEntity>> {
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
  async getById(id: number): Promise<ScheduleEntity> {
    const data = await this.repository.findOne({ where: { id } });
    if (!data) throw new NotFoundException(ErrorMsgEnum.NOT_FOUND);
    return data;
  }
  async create(dto: CreateScheduleDto): Promise<ScheduleEntity> {
    try {
      await Promise.all([
        ScheduleService.validateOpenCloseHour(dto?.openHour, dto?.closeHour),
        this.checkExistSchedule(dto),
        this.checkProvider(dto),
      ]);
      return await this.repository.save(dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async update(
    dto: UpdateScheduleDto,
    em?: EntityManager | undefined,
  ): Promise<ScheduleEntity> {
    const data = await this.getById(dto.id);
    if (dto?.openHour && dto?.closeHour)
      ScheduleService.validateOpenCloseHour(dto?.openHour, dto?.closeHour);
    return await this.repository.save(dto);
  }
  async delete(id: number): Promise<any> {
    try {
      const deletedData = await this.getById(id);
      return await this.entityManager.transaction(async (trx) => {
        await Promise.all([
          trx.softDelete(ScheduleEntity, id),
          trx.update(ScheduleEntity, deletedData.id, { status: false }),
        ]);
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  static validateOpenCloseHour(openHour: string, closeHour: string): boolean {
    if (!openHour && !closeHour) return true;
    const open = openHour.split(':');
    const close = closeHour.split(':');
    if (open[0] > close[0] || (open[0] === close[0] && open[1] >= close[1]))
      throw new BadRequestException(ErrorMsgEnum.TIME_FORMAT);
    return true;
  }

  async checkExistSchedule(dto: CreateScheduleDto) {
    const existed = await this.repository.findOne({
      where: {
        dayOfWeek: dto.dayOfWeek,
        date: dto.date,
        providerId: dto.providerId,
      },
    });
    if (existed) throw new BadRequestException(ErrorMsgEnum.EXISTED);
  }

  async checkProvider(dto: CreateScheduleDto) {
    const provider = await this.userSerivce.getById(dto.providerId);
    if (provider.role.roleName !== RoleEnum.PROVIDER)
      throw new BadRequestException(ErrorMsgEnum.NOT_PROVIDER);
  }
}
