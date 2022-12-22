import { SORT_TYPES } from '@constants';
import { ParamsId } from '@types';

import { LANGUAGES_ORDER_BY } from './languages.constants';
import { LanguageDTO } from './languages.service.mapper';

export interface ILanguage {
  title: string;
  code: string;
}

export type GetAllLanguagesQueryDTO = {
  limit: number;
  offset: number;
  orderBy: LANGUAGES_ORDER_BY;
  sort: SORT_TYPES;
  search: string;
};

export type GetAllLanguagesResponseDTO = {
  items: LanguageDTO[];
  pagination: {
    offset: number;
    limit: number;
    total: number;
  };
};

export type GetLanguageParamsDTO = ParamsId;
export type GetLanguageResponseDTO = LanguageDTO;

export type AddLanguageBodyDTO = ILanguage;
export type AddLanguageResponseDTO = LanguageDTO;

export type UpdateLanguageParamsDTO = ParamsId;
export type UpdateLanguageBodyDTO = Partial<ILanguage>;
export type UpdateLanguageResponseDTO = LanguageDTO;

export type DeleteLanguageParamsDTO = ParamsId;
