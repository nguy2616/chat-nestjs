import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAbstractEntity } from '../../../common/base/base.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('cards')
export class CardEntity extends BaseAbstractEntity {
  @Column({ name: 'expire_month', nullable: false })
  expireMonth: number;

  @Column({
    name: 'expire_year',
    nullable: false,
  })
  expireYear: number;

  @Column({ name: 'cvc', nullable: false, select: false })
  cvc: number;

  @Column({
    name: 'cardNumber',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  cardNumber: string;

  @Column({ name: 'card_holder', type: 'varchar', nullable: false })
  cardHolder: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.cards, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
