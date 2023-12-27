import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { ConversationEntity } from './entities/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConversationEntity]), UserModule],
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class ConversationModule {}
