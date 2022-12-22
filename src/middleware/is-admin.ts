import { USER_ROLES } from '@users';

import { checkRoles } from './check-roles';

export const isAdmin = checkRoles([USER_ROLES.ADMIN]);
