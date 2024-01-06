import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseAbstractService } from '../../common/base/base.service';
import { ScheduleEntity } from './entities/schedule.entity';
import { EntityManager, Repository } from 'typeorm';
import { TPaginationResult } from '../../common/types/paginationResult.type';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateScheduleDto } from './dto/createSchedule.dto';
import { UserService } from '../user/user.service';
import { RoleEnum } from '../../common/enums/role.enum';
import { ErrorMsgEnum } from '../../common/enums/errorMessage.enum';

@Injectable()
export class ScheduleService implements BaseAbstractService<ScheduleEntity> {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly repository: Repository<ScheduleEntity>,
    private readonly userSerivce: UserService,
  ) {}
  getList(query: any): Promise<TPaginationResult<ScheduleEntity>> {
    throw new Error('Method not implemented.');
  }
  getById(id: number): Promise<ScheduleEntity> | null {
    throw new Error('Method not implemented.');
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
  update(dto: any, em?: EntityManager | undefined): Promise<ScheduleEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<any> {
    throw new Error('Method not implemented.');
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
