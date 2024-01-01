import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/base/basePagination.dto';
import { UpdateCategoryDto } from './updateCategory';

export class QueryCategoryDto extends IntersectionType(
  PaginationDto,
  UpdateCategoryDto,
) {}
