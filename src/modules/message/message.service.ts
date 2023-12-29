import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorMsgEnum } from 'src/common/enums/errorMessage.enum';
import { TPaginationResult } from 'src/common/types/paginationResult.type';
import { Repository } from 'typeorm';
import { ConversationService } from '../conversation/conversation.service';
import { MessageEnum } from '../gateway/enums/message.enum';
import { CreateMessageDto } from './dto/createMessage.dto';
import { UpdateMessageDto } from './dto/updateMessage.dto';
import { MessageEntity } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly repository: Repository<MessageEntity>,
    private readonly conversationService: ConversationService,
    private eventEmitter: EventEmitter2,
  ) {}
  getList(query: any): Promise<TPaginationResult<MessageEntity>> {
    throw new Error('Method not implemented.');
  }
  async getById(id: number): Promise<MessageEntity> {
    try {
      const data = await this.repository.findOne({
        where: { id },
        relations: ['conversation'],
      });
      if (!data) throw new Error(ErrorMsgEnum.NOT_FOUND);
      return data;
    } catch (error) {
      throw new BadRequestException(error?.message ?? error);
    }
  }

  async create(dto: CreateMessageDto): Promise<MessageEntity> {
    try {
      const { conversationId, createdBy } = dto;
      const conversation =
        await this.conversationService.getById(conversationId);
      const { creatorId, recipentId } = conversation;
      if (creatorId !== createdBy && recipentId !== createdBy)
        throw new BadRequestException(ErrorMsgEnum.NOT_IN_CONVERSATION);
      const data = await this.repository.save({
        authorId: createdBy,
        ...dto,
      });
      const msg = await this.getById(data.id);
      this.eventEmitter.emit(MessageEnum.CREATE, msg);
      return msg;
    } catch (error) {
      throw new BadRequestException(error?.message ?? error);
    }
  }

  async update(dto: UpdateMessageDto): Promise<MessageEntity> {
    const message = await this.getById(dto.id);
    const updatedMsg = await this.repository.save({ ...message, ...dto });
    this.eventEmitter.emit(MessageEnum.UPDATE, updatedMsg);
    return updatedMsg;
  }

  async delete(id: number) {
    const message = await this.getById(id);
    await this.repository.softDelete(id);
    this.eventEmitter.emit(MessageEnum.DELETE, message);
    return message;
  }

  async getListByConversationId(conversationId: number) {
    try {
      const data = await this.repository.find({
        where: { conversationId },
        relations: ['author'],
        order: {
          createdAt: 'DESC',
        },
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error?.message ?? error);
    }
  }
}
