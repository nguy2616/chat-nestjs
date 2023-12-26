import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractService } from 'src/common/base/base.service';
import { ErrorMsgEnum } from 'src/common/enums/errorMessage.enum';
import { TPaginationResult } from 'src/common/types/paginationResult.type';
import { mutateQuery } from 'src/common/utils/mutateQuery';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { QueryUserDto } from './dto/queryUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './entities/user.entity';
import { hashPassword, relations } from './utils';

@Injectable()
export class UserService implements BaseAbstractService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}
  async getList(query: QueryUserDto): Promise<TPaginationResult<UserEntity>> {
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
  async getById(id: number): Promise<UserEntity> {
    const data = await this.repository.findOne({
      where: { id },
      relations: { ...relations },
    });
    if (!data) throw new NotFoundException(ErrorMsgEnum.NOT_FOUND);
    return data;
  }
  async create(
    dto: CreateUserDto,
    em?: EntityManager | undefined,
  ): Promise<UserEntity> {
    try {
      const existed = await this.getByEmail(dto.email);
      if (existed) throw new BadRequestException(ErrorMsgEnum.EXISTED);
      dto.password = await hashPassword(dto.password);
      return await this.repository.save(dto);
    } catch (error) {
      throw new BadRequestException(JSON.stringify(error?.message ?? error));
    }
  }
  async update(
    dto: UpdateUserDto,
    em?: EntityManager | undefined,
  ): Promise<UserEntity> {
    try {
      const data = await this.getById(dto.id);
      if (!data) throw new NotFoundException(ErrorMsgEnum.NOT_FOUND);
      if (dto?.password) dto.password = await hashPassword(dto.password);
      return await this.repository.save(Object.assign({ ...data, ...dto }));
    } catch (error) {
      throw new BadRequestException(JSON.stringify(error?.message ?? error));
    }
  }
  delete(id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const data = await this.repository.findOne({
      where: { email },
    });

    if (!data) throw new NotFoundException(ErrorMsgEnum.NOT_FOUND);
    return data;
  }
}
