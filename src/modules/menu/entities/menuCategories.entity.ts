import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseAbstractEntity } from '../../../common/base/base.entity';
import { MenuEntity } from './menu.entity';
import { CategoryEntity } from '../../category/entities/category.entity';

@Entity('menus_categories')
@Unique('unq_menuId_categoryId', ['menuId', 'categoryId'])
export class MenuCategoryEntity extends BaseAbstractEntity {
  @Column({ name: 'menu_id', nullable: false })
  menuId: number;

  @Column({ name: 'category_id', nullable: false })
  categoryId: number;

  @ManyToOne(() => MenuEntity, (menu) => menu.categories)
  @JoinColumn({ name: 'menu_id' })
  menu: MenuEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.menus)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}
