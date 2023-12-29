import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorMsgEnum } from 'src/common/enums/errorMessage.enum';
import { TPaginationResult } from 'src/common/types/paginationResult.type';
import { mutateQuery } from 'src/common/utils/mutateQuery';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { QueryConversationDto } from './dto/queryConversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { ConversationEntity } from './entities/conversation.entity';
import { IConversationAccess } from './utils/interface';

@Injectable()
export class ConversationService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(ConversationEntity)
    private readonly repository: Repository<ConversationEntity>,
    private eventEmitter: EventEmitter2,
    private readonly mailService: MailService,
  ) {}
  async getList(
    query: QueryConversationDto,
  ): Promise<TPaginationResult<ConversationEntity>> {
    const { limit, skip, sortBy, sortOrder, conditions } = mutateQuery(query);
    try {
      const data = await this.repository.findAndCount({
        where: { ...conditions },
        skip,
        take: limit,
        order: {
          [sortBy]: sortOrder,
        },
      });
      return {
        data: data[0],
        totalItems: data[1],
        perPage: limit,
        page: query.page,
        totalPages: Math.ceil(data[1] / limit),
      };
    } catch (error: any) {
      throw new BadRequestException(JSON.stringify(error?.message ?? error));
    }
  }
  async getById(id: number): Promise<ConversationEntity> {
    const data = await this.repository.findOne({
      where: { id },
      relations: {
        creator: true,
        recipent: true,
        messages: true,
      },
    });

    if (!data) throw new NotFoundException(ErrorMsgEnum.NOT_FOUND);
    return data;
  }
  delete(id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async create(createConversationDto: CreateConversationDto) {
    try {
      const { createdBy, recipentId, message } = createConversationDto;
      await this.checkConversationExisted(createdBy, recipentId);
      const recipent = await this.userService.getById(recipentId);
      if (createdBy === recipent.id)
        throw new BadRequestException(ErrorMsgEnum.SAME_USER);
      const conversation = await this.repository.save({
        ...createConversationDto,
        creatorId: createdBy,
        recipentId: recipent.id,
        messages: [
          {
            createdBy,
            content: message,
          },
        ],
      });
      this.eventEmitter.emit('conversation.create', conversation);
      return conversation;
    } catch (error) {
      throw new BadRequestException(error?.message ?? error);
    }
  }

  update(id: number, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} conversation`;
  }

  async checkConversationExisted(createdBy: number, recipentId: number) {
    const conversation = await this.repository.findOne({
      where: [
        {
          creatorId: createdBy,
          recipentId,
        },
        {
          creatorId: recipentId,
          recipentId: createdBy,
        },
      ],
    });
    if (conversation)
      throw new BadRequestException(ErrorMsgEnum.CONVERSATION_CREATED);
  }

  async hasAccess(accessDto: IConversationAccess) {
    const { conversationId, actorId } = accessDto;
    const conversation = await this.getById(conversationId);
    return (
      conversation.creatorId === actorId || conversation.recipentId === actorId
    );
  }
}
