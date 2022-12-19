import { USER_ROLES } from '@users';

export interface TypedJwt {
  user: {
    id: number;
    role: USER_ROLES;
  };
}
