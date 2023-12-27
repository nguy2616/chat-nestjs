import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ControllerEnum } from 'src/common/enums/controller.enum';
import JwtAuthenticationGuard from '../auth/guard/jwt.guard';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { QueryConversationDto } from './dto/queryConversation.dto';

@ApiTags(ControllerEnum.CONVERSATION)
@UseGuards(JwtAuthenticationGuard)
@Controller(ControllerEnum.CONVERSATION)
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(createConversationDto);
  }

  @Get()
  getList(@Query() query: QueryConversationDto) {
    return this.conversationService.getList(query);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.conversationService.getById(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateConversationDto: UpdateConversationDto,
  // ) {
  //   return this.conversationService.update(+id, updateConversationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.conversationService.remove(+id);
  // }
}
