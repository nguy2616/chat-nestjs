import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ControllerEnum } from 'src/common/enums/controller.enum';
import JwtAuthenticationGuard from '../auth/guard/jwt.guard';
import { CreateMessageDto } from './dto/createMessage.dto';
import { UpdateMessageDto } from './dto/updateMessage.dto';
import { MessageService } from './message.service';

@ApiTags(ControllerEnum.MESSAGE)
@Controller(ControllerEnum.MESSAGE)
@UseGuards(JwtAuthenticationGuard)
export class MessageController {
  constructor(private readonly service: MessageService) {}

  @Post()
  create(@Body() dto: CreateMessageDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateMessageDto) {
    return this.service.update({ ...dto, id });
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
