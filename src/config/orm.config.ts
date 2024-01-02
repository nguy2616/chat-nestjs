import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from 'src/environment';
import { ConversationEntity } from 'src/modules/conversation/entities/conversation.entity';
import { MessageEntity } from 'src/modules/message/entities/message.entity';
import { RoleEntity } from 'src/modules/user/entities/role.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CategoryEntity } from '../modules/category/entities/category.entity';
import { MenuEntity } from '../modules/menu/entities/menu.entity';
import { MenuCategoryEntity } from '../modules/menu/entities/menuCategories.entity';
import { BankEntity } from '../modules/bank/entities/bank.entity';
import { CardEntity } from '../modules/card/entities/card.entity';
const entities = [
  ConversationEntity,
  MessageEntity,
  RoleEntity,
  UserEntity,
  CategoryEntity,
  MenuEntity,
  MenuCategoryEntity,
  BankEntity,
  CardEntity,
];
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities,
  // entities: ['dist/modules/*/*/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: false,
};

export const dataSource = new DataSource(dataSourceOptions);
