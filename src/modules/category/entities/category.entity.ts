import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseAbstractEntity } from '../../../common/base/base.entity';
import { MenuEntity } from '../../menu/entities/menu.entity';

@Entity('categories')
export class CategoryEntity extends BaseAbstractEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @ManyToMany(() => MenuEntity, (menus) => menus.categories)
  @JoinTable({ name: 'menus_categories' })
  menus: MenuEntity[] | null;
}
