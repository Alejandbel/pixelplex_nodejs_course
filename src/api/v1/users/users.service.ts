import { LanguagesRepository } from '@languages';

import { UsersRepository } from './users.repository';

export class UsersService {
  static changeLanguage = async (userId: number, languageId: number): Promise<void> => {
    await LanguagesRepository.findByIdOrFail(languageId);
    await UsersRepository.changeLanguageById(userId, languageId);
  };
}
