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
const entities = [ConversationEntity, MessageEntity, RoleEntity, UserEntity];
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
  migrationsRun: true,
};

export const dataSource = new DataSource(dataSourceOptions);
