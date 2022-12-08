import { AppError } from '@errors';
import { Language } from '@languages';

import { USER_ROLES } from './users.constants';
import { User } from './users.entity';

export class UsersRepository {
  static create = async (email: string, normalizedEmail: string, password: string, name: string): Promise<User> => {
    let user = User.create({
      email,
      normalizedEmail,
      name,
      password,
      role: USER_ROLES.USER,
    });
    user = await User.save(user);
    return user;
  };

  static findByEmail = async (email: string): Promise<User> => {
    const user = await User.findOneBy({ email });

    if (!user) {
      throw new AppError('User with this email does not exists', 404);
    }

    return user;
  };

  static findByNormalizedEmail = async (normalizedEmail: string): Promise<User> => {
    const user = await User.findOneBy({ normalizedEmail });

    if (!user) {
      throw new AppError('User with this email does not exists', 404);
    }

    return user;
  };

  static findById = async (id: number): Promise<User> => {
    const user = await User.findOneBy({ id });

    if (!user) {
      throw new AppError('User does not exists', 404);
    }

    return user;
  };

  static changeLanguageById = async (id: number, language: Language): Promise<User> => {
    const user = await this.findById(id);
    user.language = language;
    return User.save(user);
  };
}
