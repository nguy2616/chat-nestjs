import { BaseAbstractEntity } from 'src/common/base/base.entity';
import { MessageEntity } from 'src/modules/message/entities/message.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('conversations')
@Index('creator_recipent_unq', ['creatorId', 'recipentId'], { unique: true })
export class ConversationEntity extends BaseAbstractEntity {
  @Column({ name: 'creator_id', nullable: false })
  creatorId: number;

  @Column({ name: 'recipent_id', nullable: false })
  recipentId: number;

  @OneToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'creator_id' })
  creator: UserEntity;

  @OneToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'recipent_id' })
  recipent: UserEntity;

  @OneToMany(() => MessageEntity, (messages) => messages.conversation, {
    cascade: ['insert', 'remove', 'update'],
  })
  messages: MessageEntity[];
}
