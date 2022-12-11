import { REPOSITORY_ERROR_STATUS, RepositoryError } from '@errors';
import { Language } from '@languages';

import { User } from './users.entity';

export class UsersRepository {
  static create = async (email: string, normalizedEmail: string, password: string, name: string): Promise<User> => {
    const user = User.create({
      email,
      normalizedEmail,
      name,
      password,
    });
    return User.save(user);
  };

  static findByEmail = async (email: string): Promise<User> => {
    const user = await User.findOneBy({ email });

    if (!user) {
      throw new RepositoryError('User with this email does not exists', REPOSITORY_ERROR_STATUS.NOT_FOUND);
    }

    return user;
  };

  static findByNormalizedEmail = async (normalizedEmail: string): Promise<User> => {
    const user = await User.findOneBy({ normalizedEmail });

    if (!user) {
      throw new RepositoryError('User with this email does not exists', REPOSITORY_ERROR_STATUS.NOT_FOUND);
    }

    return user;
  };

  static findById = async (id: number): Promise<User> => {
    const user = await User.findOneBy({ id });

    if (!user) {
      throw new RepositoryError('User does not exists', REPOSITORY_ERROR_STATUS.NOT_FOUND);
    }

    return user;
  };

  static changeLanguageById = async (id: number, language: Language): Promise<User> => {
    const user = await this.findById(id);
    user.language = language;
    return User.save(user);
  };
}
