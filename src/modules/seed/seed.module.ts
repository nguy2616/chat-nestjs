import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/config/orm.config';
import { RoleEntity } from '../user/entities/role.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([RoleEntity]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
