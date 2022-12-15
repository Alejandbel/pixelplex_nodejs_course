import * as jwt from 'jsonwebtoken';

import { JWT_SECRET } from '@config';
import { USER_ROLES, UsersRepository } from '@users';

export const getJwtToken = (id: number, role: USER_ROLES, expiresIn: string): string => {
  return jwt.sign({ user: { id, role } }, JWT_SECRET, { expiresIn });
};

export const isNormalizedEmailUnique = async (normalizedEmail: string): Promise<boolean> => {
  let isUnique = true;

  const conflict = await UsersRepository.findByNormalizedEmail(normalizedEmail);

  if (conflict) {
    isUnique = false;
  }

  return isUnique;
};
