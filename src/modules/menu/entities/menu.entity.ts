import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseAbstractEntity } from '../../../common/base/base.entity';
import { CategoryEntity } from '../../category/entities/category.entity';
import { MenuCategoryEntity } from './menuCategories.entity';

@Entity('menus')
export class MenuEntity extends BaseAbstractEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @OneToMany(() => MenuCategoryEntity, (categories) => categories.menu, {
    cascade: true,
  })
  categories: MenuCategoryEntity[] | null;
}
