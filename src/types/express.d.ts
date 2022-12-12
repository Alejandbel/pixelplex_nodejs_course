import { USER_ROLES } from '@users';

declare global {
  declare namespace Express {
    export interface Request {
      userId?: number;
      user?: {
        id: number;
        role: USER_ROLES;
      };
    }
  }
}
