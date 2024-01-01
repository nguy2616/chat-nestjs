import { ApiTags } from '@nestjs/swagger';
import { ControllerEnum } from '../../common/enums/controller.enum';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { QueryCategoryDto } from './dto/queryCategory.dto';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory';
import JwtAuthenticationGuard from '../auth/guard/jwt.guard';

@ApiTags(ControllerEnum.CATEGORY)
@Controller(ControllerEnum.CATEGORY)
@UseGuards(JwtAuthenticationGuard)
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  getList(@Query() query: QueryCategoryDto) {
    return this.service.getList(query);
  }

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    return this.service.update(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.service.getById(id);
  }
}
