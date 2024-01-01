import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from './entities/menu.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuCategoryEntity } from './entities/menuCategories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity, MenuCategoryEntity])],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
