import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ModuleRef } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'ASYNC_USER_SERVICE',
      useFactory: (moduleRef: ModuleRef) => {
        return () => moduleRef.get(UserService, { strict: false });
      },
      inject: [ModuleRef],
    },
  ],
  exports: [UserService],
})
export class UserModule {}
