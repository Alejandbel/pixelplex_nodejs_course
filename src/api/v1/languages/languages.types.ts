import { SORT_TYPES } from '@constants';
import { ParamsId } from '@types';

import { LANGUAGES_ORDER_BY } from './languages.constants';
import { Language } from './languages.entity';

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
  items: Language[];
  pagination: {
    offset: number;
    limit: number;
    total: number;
  };
};

export type GetLanguageParamsDTO = ParamsId;
export type GetLanguageResponseDTO = Language;

export type AddLanguageBodyDTO = ILanguage;
export type AddLanguageResponseDTO = Language;

export type UpdateLanguageParamsDTO = ParamsId;
export type UpdateLanguageBodyDTO = ILanguage;
export type UpdateLanguageResponseDTO = Language;

export type DeleteLanguageParamsDTO = ParamsId;
