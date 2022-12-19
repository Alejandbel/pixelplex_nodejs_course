import { USER_ROLES } from '@users';

declare global {
  declare namespace Express {
    export interface Request {
      user?: {
        id: number;
        role: USER_ROLES;
      };
    }
  }
}
