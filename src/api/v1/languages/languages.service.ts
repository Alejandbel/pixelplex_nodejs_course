import { SORT_TYPES } from '@constants';
import { SERVICE_ERROR_STATUS, ServiceError } from '@errors';

import { LANGUAGES_ORDER_BY } from './languages.constants';
import { LanguagesRepository } from './languages.repository';
import { LanguageDTO } from './languages.service.mapper';
import { isCodeUnique } from './languages.service.utils';
import { ILanguage } from './languages.types';

export class LanguagesService {
  static getAllLanguages = async (
    limit: number,
    offset: number,
    orderBy: LANGUAGES_ORDER_BY | undefined,
    sort: SORT_TYPES | undefined,
    search: string | undefined
  ): Promise<[LanguageDTO[], number]> => {
    const [languages, count] = await LanguagesRepository.getAllSortedAndFilteredWithCount(
      limit,
      offset,
      orderBy,
      sort,
      search
    );

    return [languages.map((language) => new LanguageDTO(language)), count];
  };

  static getLanguage = async (languageId: number): Promise<LanguageDTO> => {
    const language = await LanguagesRepository.findByIdOrFail(languageId);
    return new LanguageDTO(language);
  };

  static addLanguage = async (title: string, code: string): Promise<LanguageDTO> => {
    if (!(await isCodeUnique(code))) {
      throw new ServiceError(SERVICE_ERROR_STATUS.CODE_NOT_UNIQUE);
    }

    const language = await LanguagesRepository.create(title, code);
    return new LanguageDTO(language);
  };

  static updateLanguage = async (id: number, props: Partial<ILanguage>): Promise<LanguageDTO> => {
    if (props.code && !(await isCodeUnique(props.code))) {
      throw new ServiceError(SERVICE_ERROR_STATUS.CODE_NOT_UNIQUE);
    }

    const language = await LanguagesRepository.update(id, props);
    return new LanguageDTO(language);
  };

  static deleteLanguage = async (id: number): Promise<void> => {
    await LanguagesRepository.delete(id);
  };
}
