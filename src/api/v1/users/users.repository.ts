import { REPOSITORY_ERROR_STATUS, RepositoryError } from '@errors';

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

  static findByEmail = async (email: string): Promise<User | null> => {
    return User.findOneBy({ email });
  };

  static findByNormalizedEmail = async (normalizedEmail: string): Promise<User | null> => {
    return User.findOneBy({ normalizedEmail });
  };

  static findByIdOrFail = async (id: number): Promise<User> => {
    const user = await User.findOneBy({ id });

    if (!user) {
      throw new RepositoryError('User does not exists', REPOSITORY_ERROR_STATUS.NOT_FOUND);
    }

    return user;
  };

  static changeLanguageById = async (id: number, languageId: number): Promise<User> => {
    const user = await this.findByIdOrFail(id);
    user.languageId = languageId;
    return User.save(user);
  };
}
