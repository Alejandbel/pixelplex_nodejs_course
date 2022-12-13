import bcrypt from 'bcryptjs';
import validator from 'validator';

import { SERVICE_ERROR_STATUS, ServiceError } from '@errors';
import { UsersRepository } from '@users';

import { getJwtToken, isNormalizedEmailUnique } from './auth.service.utils';

export class AuthService {
  static async signUp(email: string, password: string, name: string): Promise<string> {
    const normalizedEmail = validator.normalizeEmail(email);

    if (!normalizedEmail) {
      throw new ServiceError('Email is incorrect', SERVICE_ERROR_STATUS.INCORRECT_EMAIL);
    }

    if (!(await isNormalizedEmailUnique(normalizedEmail))) {
      throw new ServiceError('Email already exists', SERVICE_ERROR_STATUS.EMAIL_CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await UsersRepository.create(email, normalizedEmail, hashedPassword, name);

    return getJwtToken(user.id, user.role, '1h');
  }

  static async login(email: string, password: string): Promise<string> {
    const user = await UsersRepository.findByEmail(email);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new ServiceError('Wrong password', SERVICE_ERROR_STATUS.INCORRECT_PASSWORD);
    }

    return getJwtToken(user.id, user.role, '1h');
  }
}
