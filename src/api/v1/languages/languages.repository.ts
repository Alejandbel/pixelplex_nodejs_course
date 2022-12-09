import { FindManyOptions, ILike } from 'typeorm';

import { SORT_TYPES } from '@constants';
import { AppError } from '@errors';

import { LANGUAGES_ORDER_BY } from './languages.constants';
import { Language } from './languages.entity';

export class LanguagesRepository {
  static create = async (title: string, code: string): Promise<Language> => {
    const language = Language.create({
      title,
      code,
    });
    return Language.save(language);
  };

  static update = async (id: number, props: Partial<Language>): Promise<Language | null> => {
    const currentLanguage = await this.findById(id);
    await Language.update({ id }, { ...currentLanguage, ...props });
    return this.findById(id);
  };

  static findById = async (id: number): Promise<Language> => {
    const language = await Language.findOneBy({ id });
    if (!language) {
      throw new AppError('Language does not exists', 404);
    }
    return language;
  };

  static delete = async (id: number): Promise<void> => {
    await this.findById(id);
    await Language.delete({ id });
  };

  static getAllSortedAndFiltered = async (
    limit: number,
    offset: number,
    orderBy: LANGUAGES_ORDER_BY | undefined,
    sort: SORT_TYPES | undefined,
    search: string | undefined
  ): Promise<Language[]> => {
    const findOptions: FindManyOptions<Language> = {
      skip: offset,
      take: limit,
    };

    if (!sort) {
      sort = SORT_TYPES.ASC;
    }

    if (orderBy === LANGUAGES_ORDER_BY.DATE) {
      findOptions.order = {
        createdAt: sort,
      };
    } else if (orderBy === LANGUAGES_ORDER_BY.NAME) {
      findOptions.order = {
        title: sort,
      };
    }

    if (search) {
      findOptions.where = {
        title: ILike(`%${search}%`),
      };
    }

    return Language.find(findOptions);
  };
}
