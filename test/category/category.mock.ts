import { QueryCategoryDto } from 'src/modules/category/dto/queryCategory.dto';

export const mockedQuery = {
  page: 1,
  limit: 10,
} as QueryCategoryDto;

export const mockedListCategories = {
  data: [
    {
      id: 1,
      createdAt: new Date('2024-01-02T02:23:05.796Z'),
      updatedAt: new Date('2024-01-02T02:23:05.796Z'),
      createdBy: 1,
      updatedBy: 1,
      deletedAt: null,
      status: true,
      name: 'Fast food',
      description: 'ff',
    },
    {
      id: 2,
      createdAt: '2024-01-02T02:23:15.216Z',
      updatedAt: '2024-01-02T02:23:15.216Z',
      createdBy: 1,
      updatedBy: 1,
      deletedAt: null,
      status: true,
      name: 'VN Food',
      description: null,
    },
  ],
  totalItems: 2,
  perPage: 10,
  totalPages: 1,
};

export const mockedCategory = {
  data: {
    id: 1,
    createdAt: new Date('2024-01-02T02:23:05.796Z'),
    updatedAt: new Date('2024-01-02T02:23:05.796Z'),
    createdBy: 1,
    updatedBy: 1,
    deletedAt: null,
    status: true,
    name: 'Fast food',
    description: 'ff',
    menus: null,
  },
};

export const mockedDeleteCategory = {
  data: {
    id: 1,
    createdAt: new Date('2024-01-02T02:23:05.796Z'),
    updatedAt: new Date('2024-01-02T02:23:05.796Z'),
    createdBy: 1,
    updatedBy: 1,
    deletedAt: new Date('2024-01-02T02:23:05.796Z'),
    status: false,
    name: 'Fast food',
    description: 'ff',
    menus: null,
  },
};

export const mockCreateCategoryDto = {
  name: 'Fast food',
  description: 'ff',
};
