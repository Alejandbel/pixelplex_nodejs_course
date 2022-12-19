import bcrypt from 'bcryptjs';
import validator from 'validator';

import { SERVICE_ERROR_STATUS, ServiceError } from '@errors';
import { UsersRepository } from '@users';

import { EXPIRATION_TIME_CONSTANTS, HASH_CONSTANTS } from './auth.constants';
import { getJwtToken, isNormalizedEmailUnique } from './auth.service.utils';

export class AuthService {
  static async signUp(email: string, password: string, name: string): Promise<string> {
    const normalizedEmail = validator.normalizeEmail(email);

    if (!normalizedEmail) {
      throw new ServiceError(SERVICE_ERROR_STATUS.INCORRECT_EMAIL);
    }

    if (!(await isNormalizedEmailUnique(normalizedEmail))) {
      throw new ServiceError(SERVICE_ERROR_STATUS.EMAIL_CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, HASH_CONSTANTS.SALT_LENGTH);
    const user = await UsersRepository.create(email, normalizedEmail, hashedPassword, name);

    return getJwtToken(user.id, user.role, EXPIRATION_TIME_CONSTANTS.ONE_HOUR);
  }

  static async login(email: string, password: string): Promise<string> {
    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      throw new ServiceError(SERVICE_ERROR_STATUS.EMAIL_NOT_FOUND);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new ServiceError(SERVICE_ERROR_STATUS.INCORRECT_PASSWORD);
    }

    return getJwtToken(user.id, user.role, EXPIRATION_TIME_CONSTANTS.ONE_HOUR);
  }
}
