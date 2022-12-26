import { Types } from 'mongoose';

import { User } from '../models/user.model';

import { IUser } from './users.interface';

class UsersRepository {
  async create(email: string, normalizedEmail: string, password: string, name: string): Promise<IUser> {
    return User.create({
      email,
      normalizedEmail,
      name,
      password,
    });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async findByNormalizedEmail(normalizedEmail: string): Promise<IUser | null> {
    return User.findOne({ normalizedEmail });
  }

  async findByIdOrFail(id: Types.ObjectId): Promise<IUser> {
    const user = await User.findById(id);

    if (!user) {
      throw new Error('User does not exists');
    }

    return user;
  }

  changeLanguageById = async (id: Types.ObjectId, languageId: Types.ObjectId): Promise<IUser> => {
    const user = await User.findById(id);
    user.language = languageId;
    return user.save();
  };
}

export default new UsersRepository();
