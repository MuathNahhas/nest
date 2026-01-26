import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../enum/role.enum';
import { RolesGuard } from '../guard/role.guard';
import { AuthGuard } from '../../authentication/guards/auth.guard';

export const ROLE_NAME = 'roles';
export const Roles = (...role: Role[]) => {
  return applyDecorators(
    SetMetadata(ROLE_NAME, role),
    UseGuards(AuthGuard, RolesGuard),
  );
};
