import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BaseAbstractService } from '../../common/base/base.service';
import { TPaginationResult } from '../../common/types/paginationResult.type';
import { CreateBankDto } from './dto/createBank.dto';
import { UpdateBankDto } from './dto/updateBank.dto';
import { ErrorMsgEnum } from '../../common/enums/errorMessage.enum';
import { QueryBankDto } from './dto/queryBank.dto';
import { mutateQuery } from '../../common/utils/mutateQuery';
import { BankEntity } from './entities/bank.entity';

@Injectable()
export class BankService implements BaseAbstractService<BankEntity> {
  constructor(
    @InjectRepository(BankEntity)
    private readonly repository: Repository<BankEntity>,
    private readonly entityManger: EntityManager,
  ) {}
  async getList(query: QueryBankDto): Promise<TPaginationResult<BankEntity>> {
    const { limit, skip, sortBy, sortOrder, conditions } = mutateQuery(query);
    try {
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
    } catch (error: any) {
      throw new BadRequestException(JSON.stringify(error?.message ?? error));
    }
  }
  async getById(id: number): Promise<BankEntity> {
    const data = await this.repository.findOne({ where: { id } });
    if (!data) throw new NotFoundException(ErrorMsgEnum.NOT_FOUND);
    return data;
  }
  async create(
    dto: CreateBankDto,
    em?: EntityManager | undefined,
  ): Promise<BankEntity> {
    try {
      await this.getByAccountNumber(dto.accountNumber);
      return await this.repository.save(dto);
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException(error);
    }
  }
  async update(
    dto: UpdateBankDto,
    em?: EntityManager | undefined,
  ): Promise<BankEntity> {
    const bank = await this.getById(dto.id);
    return await this.repository.save({ ...bank, ...dto });
  }
  async delete(id: number): Promise<any> {
    try {
      const bank = await this.getById(id);
      return await this.entityManger.transaction(async (trx) => {
        await Promise.all([
          trx.softDelete(BankEntity, id),
          trx.update(BankEntity, bank.id, { status: false }),
        ]);
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getByAccountNumber(accountNumber: string) {
    const bank = await this.repository.findOne({ where: { accountNumber } });
    if (bank) throw new BadRequestException(ErrorMsgEnum.EXISTED);
  }
}
