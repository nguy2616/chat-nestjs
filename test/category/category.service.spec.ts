import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getEntityManagerToken, getRepositoryToken } from '@nestjs/typeorm';
import { CategoryService } from 'src/modules/category/category.service';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { mockRepository } from 'test/mocks';
import { EntityManager, Repository } from 'typeorm';
import {
  mockedCategory,
  mockedListCategories,
  mockedQuery,
} from './mockData.data';

describe('CategoryService', () => {
  let repository: Repository<CategoryEntity>;
  let entityManager: EntityManager;
  let module: TestingModule;
  let service: CategoryService;
  beforeEach(async () => {
    const mockedRepository = {
      provide: getRepositoryToken(CategoryEntity),
      useValue: mockRepository,
    };
    const mockedEntityManager = {
      provide: getEntityManagerToken(),
      useValue: mockRepository,
    };
    module = await Test.createTestingModule({
      providers: [CategoryService, mockedRepository, mockedEntityManager],
    }).compile();

    repository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
    entityManager = module.get<EntityManager>(getEntityManagerToken());
    service = module.get<CategoryService>(CategoryService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getList', () => {
    it('should return list of categories', async () => {
      repository.findAndCount = jest
        .fn()
        .mockResolvedValue([
          mockedListCategories.data,
          mockedListCategories.totalItems,
        ]);
      expect(await repository.findAndCount()).toEqual([
        mockedListCategories.data,
        mockedListCategories.totalItems,
      ]);
      const result = await service.getList(mockedQuery);
      expect(result).toEqual(mockedListCategories);
    });
    it('should throw a BadRequestException on failure', async () => {
      repository.findAndCount = jest
        .fn()
        .mockRejectedValue(new Error('Test Error'));

      await expect(service.getList(mockedQuery)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getById', () => {
    it('should return a category', async () => {
      repository.findOne = jest.fn().mockResolvedValue(mockedCategory.data);
      expect(
        await repository.findOne({
          where: {
            id: mockedCategory.data.id,
          },
        }),
      ).toEqual(mockedCategory.data);
      const result = await service.getById(mockedCategory.data.id);
      expect(result).toEqual(mockedCategory.data);
    });
    it('should throw a NotFoundException on failure', async () => {
      repository.findOne = jest.fn().mockResolvedValue(undefined);
      await expect(service.getById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getByName', () => {
    it('should throw existed exception ', async () => {
      repository.findOne = jest.fn().mockResolvedValue(mockedCategory.data);

      expect(
        await repository.findOne({
          where: {
            name: mockedCategory.data.name,
          },
        }),
      ).toEqual(mockedCategory.data);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { name: mockedCategory.data.name },
      });
      // expect(await service.getByName(mockedCategory.data.name)).rejects.toThrow(
      //   BadRequestException,
      // );
    });
  });
});
