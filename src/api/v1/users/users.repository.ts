export class UsersRepository {
  static changeLanguage = async (languageId: number): Promise<void> => {
    console.log('changeLanguage', languageId);
  };
}
