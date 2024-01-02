import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAbstractEntity } from '../../../common/base/base.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('banks')
export class BankEntity extends BaseAbstractEntity {
  @Column({ type: 'varchar', nullable: false })
  code: string;

  @Column({ name: 'branch_code', type: 'varchar', nullable: false })
  branchCode: string;

  @Column({
    name: 'account_number',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  accountNumber: string;

  @Column({ name: 'account_name', type: 'varchar', nullable: false })
  accountName: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.banks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
