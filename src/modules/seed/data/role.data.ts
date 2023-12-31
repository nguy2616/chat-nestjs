import { RoleEnum } from 'src/common/enums/role.enum';
import { RoleEntity } from 'src/modules/user/entities/role.entity';

export const roleData: Partial<RoleEntity>[] = [
  {
    id: 1,
    roleName: RoleEnum.ADMIN,
    description: 'admin role',
  },
  {
    id: 2,
    roleName: RoleEnum.CUSTOMER,
    description: 'customer role',
  },
  {
    id: 3,
    roleName: RoleEnum.PROVIDER,
    description: 'provider role',
  },
  {
    id: 4,
    roleName: RoleEnum.OPERATOR,
    description: 'operator role',
  },
];
