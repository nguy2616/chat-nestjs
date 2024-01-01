import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseDto } from '../../../common/base/base.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;
}
