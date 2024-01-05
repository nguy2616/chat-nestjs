import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import JwtAuthenticationGuard from 'src/modules/auth/guard/jwt.guard';
import { CategoryController } from 'src/modules/category/category.controller';
import { CategoryService } from 'src/modules/category/category.service';
import * as request from 'supertest';
import { mockService } from 'test/mocks';
import { MockAuthGuard } from 'test/mocks/mockAuth.guard';
import {
  mockCreateCategoryDto,
  mockedCategory,
  mockedDeleteCategory,
  mockedListCategories,
} from './category.mock';
describe('CategoryController', () => {
  let app: INestApplication;
  const service = mockService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            ...mockService,
          },
        },
      ],
    })
      .overrideGuard(JwtAuthenticationGuard)
      .useClass(MockAuthGuard)
      .compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('getList', () => {
    it('should return a list of categories', () => {
      service.getList.mockResolvedValue(mockedListCategories);
      return request(app.getHttpServer())
        .get('/categories')
        .expect(200)
        .expect(JSON.parse(JSON.stringify(mockedListCategories)));
    });
  });

  describe('getById', () => {
    it('should return a category', () => {
      service.getById.mockResolvedValue(mockedCategory);
      return request(app.getHttpServer())
        .get(`/categories/${mockedCategory.data.id}`)
        .expect(200)
        .expect(JSON.parse(JSON.stringify(mockedCategory)));
    });
  });

  describe('create', () => {
    it('should return a new category', () => {
      service.create.mockResolvedValue(mockedCategory);
      return request(app.getHttpServer())
        .post('/categories')
        .send(mockCreateCategoryDto)
        .expect(201)
        .expect(JSON.parse(JSON.stringify(mockedCategory)));
    });
  });
  describe('update', () => {
    it('should update a category', () => {
      const mockUpdateCategoryDto = {
        id: mockedCategory.data.id,
        name: 'Updated Category',
      };
      service.update.mockResolvedValue({
        ...mockedCategory,
        data: { ...mockedCategory.data, ...mockUpdateCategoryDto },
      });
      return request(app.getHttpServer())
        .put(`/categories/${mockedCategory.data.id}`)
        .send(mockUpdateCategoryDto)
        .expect(200)
        .expect(
          JSON.parse(
            JSON.stringify({
              ...mockedCategory,
              data: { ...mockedCategory.data, ...mockUpdateCategoryDto },
            }),
          ),
        );
    });
  });

  describe('delete', () => {
    it('should delete a category', () => {
      service.delete.mockResolvedValue(mockedDeleteCategory);
      return request(app.getHttpServer())
        .delete(`/categories/${mockedCategory.data.id}`)
        .expect(200);
    });
  });
});
