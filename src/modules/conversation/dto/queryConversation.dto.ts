import { IntersectionType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { PaginationDto } from 'src/common/base/basePagination.dto';
import { UpdateConversationDto } from './update-conversation.dto';

export class QueryConversationDto extends IntersectionType(
  PaginationDto,
  UpdateConversationDto,
) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
