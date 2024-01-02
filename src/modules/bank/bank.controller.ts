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
import { BankService } from './bank.service';
import { QueryBankDto } from './dto/queryBank.dto';
import { CreateBankDto } from './dto/createBank.dto';
import { UpdateBankDto } from './dto/updateBank.dto';
import JwtAuthenticationGuard from '../auth/guard/jwt.guard';

@ApiTags(ControllerEnum.BANK)
@Controller(ControllerEnum.BANK)
@UseGuards(JwtAuthenticationGuard)
export class BankController {
  constructor(private readonly service: BankService) {}

  @Get()
  getList(@Query() query: QueryBankDto) {
    return this.service.getList(query);
  }

  @Post()
  create(@Body() dto: CreateBankDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateBankDto) {
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
