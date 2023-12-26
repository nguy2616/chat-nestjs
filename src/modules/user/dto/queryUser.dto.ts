import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/base/basePagination.dto';
import { UpdateUserDto } from './updateUser.dto';

export class QueryUserDto extends IntersectionType(
  PaginationDto,
  UpdateUserDto,
) {}
