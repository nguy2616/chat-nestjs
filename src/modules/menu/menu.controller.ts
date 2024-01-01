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
import { QueryMenuDto } from './dto/queryMenu.dto';
import { CreateMenuDto } from './dto/createMenu.dto';
import JwtAuthenticationGuard from '../auth/guard/jwt.guard';
import { MenuService } from './menu.service';
import { UpdateMenuDto } from './dto/updateMenu.dto';

@ApiTags(ControllerEnum.MENU)
@Controller(ControllerEnum.MENU)
@UseGuards(JwtAuthenticationGuard)
export class MenuController {
  constructor(private readonly service: MenuService) {}

  @Get()
  getList(@Query() query: QueryMenuDto) {
    return this.service.getList(query);
  }

  @Post()
  create(@Body() dto: CreateMenuDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateMenuDto) {
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
