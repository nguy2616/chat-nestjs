import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getEntityManagerToken, getRepositoryToken } from '@nestjs/typeorm';
import { CategoryService } from 'src/modules/category/category.service';
import { CreateCategoryDto } from 'src/modules/category/dto/createCategory.dto';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { mockRepository } from 'test/mocks';
import { EntityManager, Repository } from 'typeorm';
import {
  mockCreateCategoryDto,
  mockedCategory,
  mockedDeleteCategory,
  mockedListCategories,
  mockedQuery,
} from './category.mock';

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
    it('should return a category ', async () => {
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
      const result = await service.getByName(mockedCategory.data.name);
      expect(result).toEqual(mockedCategory.data);
    });
  });

  describe('create', () => {
    it('should create a category when category name is not existed', async () => {
      jest.spyOn(service, 'getByName').mockResolvedValue(undefined);
      repository.save = jest.fn().mockResolvedValue(mockedCategory.data);
      expect(
        await service.create(mockCreateCategoryDto as CreateCategoryDto),
      ).toEqual(mockedCategory.data);
    });

    it('should throw exception on category name existed', async () => {
      jest.spyOn(service, 'getByName').mockResolvedValue(new CategoryEntity());
      await expect(
        service.create(mockCreateCategoryDto as CreateCategoryDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update a category when category name is not existed', async () => {
      jest.spyOn(service, 'getByName').mockResolvedValue(undefined);
      repository.save = jest.fn().mockResolvedValue(mockedCategory.data);
      expect(
        await service.update(mockCreateCategoryDto as CreateCategoryDto),
      ).toEqual(mockedCategory.data);
    });

    it('should throw exception if category not found', async () => {
      jest.spyOn(service, 'getById').mockRejectedValue(new NotFoundException());
      await expect(
        service.update(mockCreateCategoryDto as CreateCategoryDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw exception on category name existed', async () => {
      jest.spyOn(service, 'getByName').mockResolvedValue(new CategoryEntity());
      await expect(
        service.update(mockCreateCategoryDto as CreateCategoryDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete', () => {
    it('should throw exception if category not found', async () => {
      jest.spyOn(service, 'getById').mockRejectedValue(new NotFoundException());
      await expect(service.delete(1)).rejects.toThrow(BadRequestException);
    });

    it('should delete a category with soft delete and status = false', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(mockedCategory.data);
      repository.softDelete = jest
        .fn()
        .mockResolvedValue(mockedDeleteCategory.data);
      repository.update = jest
        .fn()
        .mockResolvedValue(mockedDeleteCategory.data);
      const result = await service.delete(mockedDeleteCategory.data.id);

      expect(repository.softDelete).toHaveBeenCalledWith(
        CategoryEntity,
        mockedCategory.data.id,
      );
      expect(repository.update).toHaveBeenCalledWith(
        CategoryEntity,
        mockedCategory.data.id,
        { status: false },
      );
    });
  });
});
