import { Types } from 'mongoose';

import { SORT_TYPES } from '../common.constants';
import { Language } from '../models/language.model';

import { LANGUAGES_ORDER_BY } from './languages.constants';
import { ILanguage } from './languages.interface';

export class LanguagesRepository {
  static create = async (title: string, code: string): Promise<ILanguage> => {
    return Language.create({
      title,
      code,
    });
  };

  static update = async (id: Types.ObjectId, props: Partial<ILanguage>): Promise<ILanguage> => {
    await Language.updateOne({ _id: id }, props);
    return this.findByIdOrFail(id);
  };

  static findByIdOrFail = async (id: Types.ObjectId): Promise<ILanguage> => {
    const language = await Language.findById(id);

    if (!language) {
      throw new Error('Language does not exists');
    }

    return language;
  };

  static findByCode = async (code: string): Promise<ILanguage | null> => {
    return Language.findOne({ code });
  };

  static delete = async (id: Types.ObjectId): Promise<void> => {
    await this.findByIdOrFail(id);
    await Language.deleteOne({ _id: id });
  };

  static getAllSortedAndFilteredWithCount = async (
    limit: number,
    offset: number,
    orderBy: LANGUAGES_ORDER_BY | undefined,
    sort: SORT_TYPES | undefined,
    search: string | undefined
  ): Promise<[ILanguage[], number]> => {
    let query = Language.find({});

    if (search) {
      query = query.find({ title: new RegExp(search, 'i') });
    }

    if (orderBy) {
      sort = sort ?? SORT_TYPES.ASC;
      switch (orderBy) {
        case LANGUAGES_ORDER_BY.DATE: {
          query = query.sort([['createdAt', sort]]);
          break;
        }
        case LANGUAGES_ORDER_BY.NAME: {
          query = query.sort([['title', sort]]);
          break;
        }
      }
    }

    const count = await (search ? Language.countDocuments({ title: search }) : Language.countDocuments({})).exec();

    const languages = await query.skip(offset).limit(limit).exec();

    return [languages, count];
  };
}
