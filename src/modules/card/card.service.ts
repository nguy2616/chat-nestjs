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
import { CreateCardDto } from './dto/createCard.dto';
import { UpdateCardDto } from './dto/updateCard.dto';
import { ErrorMsgEnum } from '../../common/enums/errorMessage.enum';
import { QueryCardDto } from './dto/queryCard.dto';
import { mutateQuery } from '../../common/utils/mutateQuery';
import { CardEntity } from './entities/card.entity';

@Injectable()
export class CardService implements BaseAbstractService<CardEntity> {
  constructor(
    @InjectRepository(CardEntity)
    private readonly repository: Repository<CardEntity>,
    private readonly entityManger: EntityManager,
  ) {}
  async getList(query: QueryCardDto): Promise<TPaginationResult<CardEntity>> {
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
  async getById(id: number): Promise<CardEntity> {
    const data = await this.repository.findOne({ where: { id } });
    if (!data) throw new NotFoundException(ErrorMsgEnum.NOT_FOUND);
    return data;
  }
  async create(
    dto: CreateCardDto,
    em?: EntityManager | undefined,
  ): Promise<CardEntity> {
    try {
      await this.getByCardNumber(dto.cardNumber);
      return await this.repository.save(dto);
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException(error);
    }
  }
  async update(
    dto: UpdateCardDto,
    em?: EntityManager | undefined,
  ): Promise<CardEntity> {
    const bank = await this.getById(dto.id);
    return await this.repository.save({ ...bank, ...dto });
  }
  async delete(id: number): Promise<any> {
    try {
      const bank = await this.getById(id);
      return await this.entityManger.transaction(async (trx) => {
        await Promise.all([
          trx.softDelete(CardEntity, id),
          trx.update(CardEntity, bank.id, { status: false }),
        ]);
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getByCardNumber(cardNumber: string) {
    const bank = await this.repository.findOne({ where: { cardNumber } });
    if (bank) throw new BadRequestException(ErrorMsgEnum.EXISTED);
  }
}
