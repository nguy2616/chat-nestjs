import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './createCategory.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
