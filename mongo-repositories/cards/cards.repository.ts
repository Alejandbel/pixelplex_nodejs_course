import { Types } from 'mongoose';

import { SORT_TYPES } from '../common.constants';
import { Card } from '../models/card.model';

import { CARDS_ORDER_BY } from './cards.constants';
import { ICard } from './cards.inteface';

export class CardsRepository {
  static create = async (
    nativeWord: string,
    nativeLanguageId: string,
    foreignWord: string,
    foreignLanguageId: number,
    userId: number
  ): Promise<ICard> => {
    return Card.create({
      nativeLanguage: nativeLanguageId,
      nativeWord,
      foreignLanguage: foreignLanguageId,
      foreignWord,
      userId,
    });
  };

  static update = async (id: Types.ObjectId, props: Partial<ICard>): Promise<ICard> => {
    await Card.updateOne({ _id: id }, props);
    return this.findByIdOrFail(id);
  };

  static findByIdOrFail = async (id: Types.ObjectId): Promise<ICard> => {
    const card = await Card.findById(id);

    if (!card) {
      throw new Error('Card does not exists');
    }

    return card;
  };

  static delete = async (id: Types.ObjectId): Promise<void> => {
    await this.findByIdOrFail(id);
    await Card.deleteOne({ _id: id });
  };

  static getAllSortedAndFilteredByUserWithCount = async (
    limit: number,
    offset: number,
    orderBy: CARDS_ORDER_BY | undefined,
    sort: SORT_TYPES | undefined,
    search: string | undefined,
    userId: Types.ObjectId,
    languageId: Types.ObjectId
  ): Promise<[ICard[], number]> => {
    let query = Card.find({
      $and: [
        { user: userId },
        {
          $or: [
            {
              nativeLanguage: languageId,
            },
            {
              foreignLanguage: languageId,
            },
          ],
        },
      ],
    });

    if (search) {
      query = query.find({
        $or: [{ nativeWord: search }, { foreignWord: search }],
      });
    }

    if (orderBy) {
      sort = sort ?? SORT_TYPES.ASC;
      switch (orderBy) {
        case CARDS_ORDER_BY.DATE: {
          query = query.sort([['createdAt', sort]]);
          break;
        }
        case CARDS_ORDER_BY.FOREIGN: {
          query = query.sort([['foreignWord', sort]]);
          break;
        }
        case CARDS_ORDER_BY.NATIVE: {
          query = query.sort([['nativeWord', sort]]);
          break;
        }
      }
    }

    const count = await (search
      ? Card.countDocuments({
          $or: [{ nativeWord: search }, { foreignWord: search }],
        })
      : Card.countDocuments({})
    ).exec();

    const cards = await query.skip(offset).limit(limit).exec();

    return [cards, count];
  };
}
