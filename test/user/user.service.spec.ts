import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getEntityManagerToken, getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/modules/user/dto/createUser.dto';
import { QueryUserDto } from 'src/modules/user/dto/queryUser.dto';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { mockRepository } from 'test/mocks';
import { EntityManager, Repository } from 'typeorm';
import {
  mockCreateUserDto,
  mockDeleteUser,
  mockUser,
  mockUserList,
} from './user.mock';

describe('UserService', () => {
  let service: UserService;
  let entityManger: EntityManager;
  let repository: Repository<UserEntity>;
  let module: TestingModule;

  beforeEach(async () => {
    const mockedRepository = {
      provide: getRepositoryToken(UserEntity),
      useValue: mockRepository,
    };

    const mockedEntityManager = {
      provide: getEntityManagerToken(),
      useValue: mockRepository,
    };

    module = await Test.createTestingModule({
      providers: [UserService, mockedRepository, mockedEntityManager],
    }).compile();

    repository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );

    entityManger = module.get<EntityManager>(getEntityManagerToken());
    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getList', () => {
    it('should return list of users', async () => {
      repository.findAndCount = jest
        .fn()
        .mockResolvedValue([mockUserList.data, mockUserList.totalItems]);

      const result = await service.getList({} as QueryUserDto);

      expect(result).toEqual(mockUserList);
    });
  });

  describe('getById', () => {
    it('should return a user if found', async () => {
      repository.findOne = jest.fn().mockResolvedValue(mockUser.data);

      const result = await service.getById(mockUser.data.id);

      expect(result).toEqual(mockUser.data);
    });

    it('should throw NotfoundException if not found', async () => {
      repository.findOne = jest.fn().mockResolvedValue(undefined);

      await expect(service.getById(mockUser.data.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getByEmail', () => {
    it('should return a user if found', async () => {
      repository.findOne = jest.fn().mockResolvedValue(mockUser.data);

      const result = await service.getByEmail(mockUser.data.email);

      expect(result).toEqual(mockUser.data);
    });
  });

  describe('create', () => {
    it('should create a new user if not existed', async () => {
      jest.spyOn(service, 'getByEmail').mockResolvedValue(undefined);
      repository.save = jest.fn().mockResolvedValue(mockUser.data);

      const result = await service.create(mockCreateUserDto as CreateUserDto);

      expect(result).toEqual(mockUser.data);
    });

    it('should throw a BadRequestException if existed', async () => {
      jest.spyOn(service, 'getByEmail').mockResolvedValue(mockUser.data as any);

      await expect(
        service.create(mockCreateUserDto as CreateUserDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update a user if found', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(mockUser.data as any);

      repository.save = jest.fn().mockResolvedValue(mockUser.data);

      const result = await service.update(mockUser.data as any);

      expect(result).toEqual(mockUser.data);
    });

    it('should throw a NotFoundException if not found', async () => {
      jest.spyOn(service, 'getById').mockRejectedValue(new NotFoundException());

      await expect(service.update(mockUser.data as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('delete', () => {
    it('should throw exception if user not found', async () => {
      jest.spyOn(service, 'getById').mockRejectedValue(new NotFoundException());
      await expect(service.delete(1)).rejects.toThrow(BadRequestException);
    });

    it('should delete a user with soft delete and status = false', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(mockUser.data as any);
      repository.softDelete = jest.fn().mockResolvedValue(mockDeleteUser.data);
      repository.update = jest.fn().mockResolvedValue(mockDeleteUser.data);
      const result = await service.delete(mockDeleteUser.data.id);

      expect(repository.softDelete).toHaveBeenCalledWith(
        UserEntity,
        mockDeleteUser.data.id,
      );
      expect(repository.update).toHaveBeenCalledWith(
        UserEntity,
        mockDeleteUser.data.id,
        { status: false },
      );
    });
  });
});
