import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/base/basePagination.dto';
import { UpdateBankDto } from './updateBank.dto';

export class QueryBankDto extends IntersectionType(
  PaginationDto,
  UpdateBankDto,
) {}
