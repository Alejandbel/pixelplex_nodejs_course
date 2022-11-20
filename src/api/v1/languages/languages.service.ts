import { ILanguage, Language } from './languages.entity';

export class LanguagesService {
  static getAllLanguages = async (
    limit: number,
    offset: number,
    orderBy: 'name' | 'date',
    sort: 'asc' | 'desc',
    search: string
  ): Promise<Language[]> => {
    console.log('getAllLanguages', limit, offset, orderBy, sort, search);
    return [
      {
        id: 1,
        title: 'English',
        code: 'en',
      },
      {
        id: 2,
        title: 'Russian',
        code: 'ru',
      },
    ];
  };

  static getLanguage = async (id: number): Promise<Language> => {
    console.log('getLanguage', id);
    return {
      id: id,
      title: 'English',
      code: 'en',
    };
  };

  static addLanguage = async (title: string, code: string): Promise<Language> => {
    console.log('addLanguage', title, code);
    return new Language(title, code);
  };

  static updateLanguage = async (id: number, props: ILanguage): Promise<Language> => {
    console.log('updateLanguage', id, props);
    return {
      id: id,
      title: 'English',
      code: 'en',
    };
  };

  static deleteLanguage = async (id: number): Promise<void> => {
    console.log('deleteLanguage', id);
  };
}
