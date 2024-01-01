import { IntersectionType, OmitType } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/base/basePagination.dto';
import { CreateMenuDto } from './createMenu.dto';
import { UpdateMenuDto } from './updateMenu.dto';

export class QueryMenuDto extends IntersectionType(
  PaginationDto,
  OmitType(UpdateMenuDto, ['categoryIds']),
) {}
