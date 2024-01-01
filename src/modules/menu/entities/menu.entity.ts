import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseAbstractEntity } from '../../../common/base/base.entity';
import { CategoryEntity } from '../../category/entities/category.entity';

@Entity('menus')
export class MenuEntity extends BaseAbstractEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @ManyToMany(() => CategoryEntity, (categories) => categories.menus, {
    cascade: true,
  })
  @JoinTable({ name: 'menus_categories' })
  categories: CategoryEntity[];
}
