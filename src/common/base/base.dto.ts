import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class BaseDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  createdAt: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  updatedAt: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  createdBy: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  updatedBy: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  deleteAt: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  status: boolean;
}
