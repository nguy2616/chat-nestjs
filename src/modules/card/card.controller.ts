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
import { CardService } from './card.service';
import { QueryCardDto } from './dto/queryCard.dto';
import { CreateCardDto } from './dto/createCard.dto';
import { UpdateCardDto } from './dto/updateCard.dto';
import JwtAuthenticationGuard from '../auth/guard/jwt.guard';

@ApiTags(ControllerEnum.CARD)
@Controller(ControllerEnum.CARD)
@UseGuards(JwtAuthenticationGuard)
export class CardController {
  constructor(private readonly service: CardService) {}

  @Get()
  getList(@Query() query: QueryCardDto) {
    return this.service.getList(query);
  }

  @Post()
  create(@Body() dto: CreateCardDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateCardDto) {
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
