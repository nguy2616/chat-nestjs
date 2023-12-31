import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../user/entities/role.entity';
import { roleData } from './data/role.data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async seed() {
    await this.seedRole();
  }

  async seedRole() {
    return this.roleRepository.save(roleData);
  }
}
