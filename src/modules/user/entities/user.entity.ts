import { BaseAbstractEntity } from 'src/common/base/base.entity';
import { MessageEntity } from 'src/modules/message/entities/message.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { RoleEntity } from './role.entity';
import { BankEntity } from '../../bank/entities/bank.entity';
import { CardEntity } from '../../card/entities/card.entity';
import { ScheduleEntity } from '../../schedule/entities/schedule.entity';

@Entity('users')
export class UserEntity extends BaseAbstractEntity {
  @Column({ name: 'first_name', nullable: false, type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', nullable: false, type: 'varchar' })
  lastName: string;

  @Column({ name: 'email', nullable: false, type: 'varchar', unique: true })
  email: string;

  @Column({ name: 'password', nullable: false, type: 'varchar' })
  password: string;

  @Column({ name: 'role_id', nullable: false, type: 'int' })
  roleId: number;

  @ManyToOne(() => RoleEntity, (roles) => roles.user)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @OneToMany(() => MessageEntity, (messages) => messages.author)
  messages: MessageEntity[];

  @OneToMany(() => BankEntity, (banks) => banks.user, {
    cascade: true,
  })
  banks: BankEntity[];

  @OneToMany(() => CardEntity, (cards) => cards.user, {
    cascade: true,
  })
  cards: CardEntity[];

  @OneToMany(() => ScheduleEntity, (schedules) => schedules.provider, {
    cascade: true,
  })
  schedules: ScheduleEntity[];
}
