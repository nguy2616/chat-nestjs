import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  page: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  limit: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sortBy: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sortOrder: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  actorId: number;
}
