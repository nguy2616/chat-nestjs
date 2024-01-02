import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/base/basePagination.dto';
import { UpdateCardDto } from './updateCard.dto';

export class QueryCardDto extends IntersectionType(
  PaginationDto,
  UpdateCardDto,
) {}
