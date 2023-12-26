import { BaseAbstractEntity } from 'src/common/base/base.entity';
import { RoleEnum } from 'src/common/enums/role.enum';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('roles')
export class RoleEntity extends BaseAbstractEntity {
  @Column({
    name: 'role_name',
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.CUSTOMER,
    nullable: false,
  })
  roleName: RoleEnum;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description: string;

  @OneToMany(() => UserEntity, (users) => users.role)
  user: UserEntity[];
}
