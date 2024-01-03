import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import * as crypto from 'crypto';
import { EntityManager, Repository } from 'typeorm';
import { BaseAbstractService } from '../../common/base/base.service';
import { ErrorMsgEnum } from '../../common/enums/errorMessage.enum';
import { TPaginationResult } from '../../common/types/paginationResult.type';
import { mutateQuery } from '../../common/utils/mutateQuery';
import { CreateCardDto } from './dto/createCard.dto';
import { QueryCardDto } from './dto/queryCard.dto';
import { UpdateCardDto } from './dto/updateCard.dto';
import { CardEntity } from './entities/card.entity';

@Injectable()
export class CardService implements BaseAbstractService<CardEntity> {
  private key: Buffer;
  private iv: Buffer;
  private cipher: crypto.Cipher;

  constructor(
    @InjectRepository(CardEntity)
    private readonly repository: Repository<CardEntity>,
    private readonly entityManger: EntityManager,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.onModuleInit();
  }
  async onModuleInit() {
    // this.key = (await this.cacheManager.get('key')) ?? crypto.randomBytes(32);
    // this.iv = (await this.cacheManager.get('iv')) ?? crypto.randomBytes(16);
    this.key = crypto.randomBytes(32);
    this.iv = crypto.randomBytes(16);
    // const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
    // await this.cacheManager.set('key', this.key);
    // await this.cacheManager.set('in', this.iv);
    // await this.cacheManager.set('cipher', cipher);
  }
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
    try {
      const data = await this.repository.findOne({ where: { id } });
      if (!data) throw new NotFoundException(ErrorMsgEnum.NOT_FOUND);
      data.cardNumber = this.decrypt(data.cardNumber);
      data.cvv = this.decrypt(data.cvv);
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async create(
    dto: CreateCardDto,
    em?: EntityManager | undefined,
  ): Promise<CardEntity> {
    try {
      dto.cardNumber = this.encrypt(dto.cardNumber);
      dto.cvv = this.encrypt(dto.cvv.toString());
      Logger.debug('card', dto.cardNumber, dto.cvv);
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

  private encrypt(text: string) {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
  }

  private decrypt(text: string): string {
    const encryptedText = Buffer.from(text, 'hex');
    const decipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
