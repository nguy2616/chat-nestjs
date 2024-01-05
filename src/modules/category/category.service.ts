import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BaseAbstractService } from '../../common/base/base.service';
import { ErrorMsgEnum } from '../../common/enums/errorMessage.enum';
import { TPaginationResult } from '../../common/types/paginationResult.type';
import { mutateQuery } from '../../common/utils/mutateQuery';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { QueryCategoryDto } from './dto/queryCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService implements BaseAbstractService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
    private readonly entityManger: EntityManager,
  ) {}
  async getList(
    query: QueryCategoryDto,
  ): Promise<TPaginationResult<CategoryEntity>> {
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
  async getById(id: number): Promise<CategoryEntity> {
    const data = await this.repository.findOne({ where: { id } });
    if (!data) throw new NotFoundException(ErrorMsgEnum.NOT_FOUND);
    return data;
  }
  async create(
    dto: CreateCategoryDto,
    em?: EntityManager | undefined,
  ): Promise<CategoryEntity> {
    const existed = await this.getByName(dto.name);
    if (existed) throw new BadRequestException(ErrorMsgEnum.EXISTED);
    return await this.repository.save(dto);
  }
  async update(
    dto: UpdateCategoryDto,
    em?: EntityManager | undefined,
  ): Promise<CategoryEntity> {
    const category = await this.getById(dto.id);
    if (dto?.name) {
      const existed = await this.getByName(dto.name);
      if (existed) throw new BadRequestException(ErrorMsgEnum.EXISTED);
    }
    return await this.repository.save({ ...category, ...dto });
  }
  async delete(id: number): Promise<any> {
    try {
      const category = await this.getById(id);
      return await this.entityManger.transaction(async (trx) => {
        await Promise.all([
          trx.softDelete(CategoryEntity, id),
          trx.update(CategoryEntity, category.id, { status: false }),
        ]);
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getByName(name: string) {
    const category = await this.repository.findOne({ where: { name } });
    if (category) return category;
  }
}
