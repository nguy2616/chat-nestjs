import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BaseAbstractService } from '../../common/base/base.service';
import { MenuEntity } from './entities/menu.entity';
import { EntityManager, In, Repository } from 'typeorm';
import { TPaginationResult } from '../../common/types/paginationResult.type';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryMenuDto } from './dto/queryMenu.dto';
import { mutateQuery } from '../../common/utils/mutateQuery';
import { ErrorMsgEnum } from '../../common/enums/errorMessage.enum';
import { CreateCategoryDto } from '../category/dto/createCategory.dto';
import { UpdateCategoryDto } from '../category/dto/updateCategory';
import { CategoryEntity } from '../category/entities/category.entity';
import { CreateMenuDto } from './dto/createMenu.dto';
import { UpdateMenuDto } from './dto/updateMenu.dto';
import { MenuCategoryEntity } from './entities/menuCategories.entity';

@Injectable()
export class MenuService implements BaseAbstractService<MenuEntity> {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly repository: Repository<MenuEntity>,
    private readonly entityManager: EntityManager,
  ) {}
  async getList(query: QueryMenuDto): Promise<TPaginationResult<MenuEntity>> {
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
  async getById(id: number): Promise<MenuEntity> {
    const data = await this.repository.findOne({ where: { id } });
    if (!data) throw new NotFoundException(ErrorMsgEnum.NOT_FOUND);
    return data;
  }
  async create(
    dto: CreateMenuDto,
    em?: EntityManager | undefined,
  ): Promise<MenuEntity> {
    try {
      return await this.entityManager.transaction(async (trx) => {
        const foundCategories = await trx.count(CategoryEntity, {
          where: {
            id: In(dto.categoryIds),
          },
        });
        if (foundCategories !== dto.categoryIds.length)
          throw new BadRequestException(ErrorMsgEnum.NOT_FOUND);
        const menu = await trx.save(MenuEntity, {
          ...dto,
        });
        await trx.save(
          MenuCategoryEntity,
          dto.categoryIds.map((id) => ({ menuId: menu.id, categoryId: id })),
        );
        return menu;
      });
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException(error);
    }
  }
  async update(
    dto: UpdateMenuDto,
    em?: EntityManager | undefined,
  ): Promise<MenuEntity> {
    try {
      await this.getById(dto.id);
      return await this.entityManager.transaction(async (trx) => {
        if (dto.categoryIds) {
          const foundCategories = await trx.count(CategoryEntity, {
            where: {
              id: In(dto.categoryIds),
            },
          });
          if (foundCategories !== dto.categoryIds.length)
            throw new BadRequestException(ErrorMsgEnum.NOT_FOUND);
          return await trx.save(MenuEntity, {
            ...dto,
            categories: dto?.categoryIds?.map((id) => ({ id })),
          });
        } else {
          return await trx.save(MenuEntity, {
            ...dto,
          });
        }
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async delete(id: number): Promise<any> {
    try {
      const menu = await this.getById(id);
      return await this.entityManager.transaction(async (trx) => {
        await Promise.all([
          trx.softDelete(MenuEntity, id),
          trx.update(MenuEntity, menu.id, { status: false }),
        ]);
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
