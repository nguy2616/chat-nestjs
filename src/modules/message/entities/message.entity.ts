import { BaseAbstractEntity } from 'src/common/base/base.entity';
import { ConversationEntity } from 'src/modules/conversation/entities/conversation.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('messages')
export class MessageEntity extends BaseAbstractEntity {
  @Column({ nullable: true, type: 'text' })
  content: string;

  @Column({ name: 'author_id', nullable: true })
  authorId: number;

  @Column({ name: 'conversation_id', nullable: true })
  conversationId: number;

  @ManyToOne(() => UserEntity, (user) => user.messages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'auhtor_id' })
  author: UserEntity;

  @ManyToOne(
    () => ConversationEntity,
    (conversation) => conversation.messages,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'conversation_id' })
  conversation: ConversationEntity;
}
