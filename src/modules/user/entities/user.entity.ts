import { BaseAbstractEntity } from 'src/common/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('users')
export class UserEntity extends BaseAbstractEntity {
  @Column({ name: 'first_name', nullable: false, type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', nullable: false, type: 'varchar' })
  lastName: string;

  @Column({ name: 'email', nullable: false, type: 'varchar' })
  email: string;

  @Column({ name: 'password', nullable: false, type: 'varchar' })
  password: string;

  @Column({ name: 'role_id', nullable: false, type: 'int' })
  roleId: number;

  @ManyToOne(() => RoleEntity, (roles) => roles.user)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;
}
