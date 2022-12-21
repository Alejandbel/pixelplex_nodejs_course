import { SORT_TYPES } from '@constants';
import { REPOSITORY_ERROR_STATUS, RepositoryError } from '@errors';

import { LANGUAGES_ORDER_BY } from './languages.constants';
import { Language } from './languages.entity';
import { FindOptionsBuilder } from './languages.repository.utils';

export class LanguagesRepository {
  static create = async (title: string, code: string): Promise<Language> => {
    const language = Language.create({
      title,
      code,
    });
    return Language.save(language);
  };

  static update = async (id: number, props: Partial<Language>): Promise<Language> => {
    await Language.update({ id }, props);
    return this.findByIdOrFail(id);
  };

  static findByIdOrFail = async (id: number): Promise<Language> => {
    const language = await Language.findOneBy({ id });

    if (!language) {
      throw new RepositoryError('Language does not exists', REPOSITORY_ERROR_STATUS.NOT_FOUND);
    }

    return language;
  };

  static findByCode = async (code: string): Promise<Language | null> => {
    return Language.findOneBy({ code });
  };

  static delete = async (id: number): Promise<void> => {
    await this.findByIdOrFail(id);
    await Language.delete({ id });
  };

  static getAllSortedAndFiltered = async (
    limit: number,
    offset: number,
    orderBy: LANGUAGES_ORDER_BY | undefined,
    sort: SORT_TYPES | undefined,
    search: string | undefined
  ): Promise<[Language[], number]> => {
    const findOptions = new FindOptionsBuilder()
      .applyLimitAndOffset(offset, limit)
      .applySort(sort)
      .applyOrderBy(orderBy)
      .applySearch(search)
      .getFindOptions();

    return Language.findAndCount(findOptions);
  };
}
