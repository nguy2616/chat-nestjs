import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseAbstractEntity } from '../../../common/base/base.entity';
import { MenuEntity } from '../../menu/entities/menu.entity';
import { MenuCategoryEntity } from '../../menu/entities/menuCategories.entity';

@Entity('categories')
export class CategoryEntity extends BaseAbstractEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @OneToMany(() => MenuCategoryEntity, (menus) => menus.category, {
    cascade: true,
  })
  menus: MenuCategoryEntity[] | null;
}
