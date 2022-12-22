import { In, UpdateResult } from 'typeorm';

import { REPOSITORY_ERROR_STATUS, RepositoryError } from '@errors';

import { AppDataSource } from '../../../data-source';

import { Word } from './words.entity';
import { IWord } from './words.types';

export class WordsRepository {
  static create = async (word: string, languageId: number, userId: number): Promise<Word> => {
    const createdWord = Word.create({
      word,
      languageId,
      userId,
    });

    return Word.save(createdWord);
  };

  static createMany = async (wordsToCreate: IWord[]): Promise<Word[]> => {
    const wordsRepository = Word.getRepository();
    return wordsRepository.save(wordsRepository.create(wordsToCreate));
  };

  static findByIdOrFail = async (id: number): Promise<Word> => {
    const word = await Word.findOneBy({ id });

    if (!word) {
      throw new RepositoryError('Word does not exists', REPOSITORY_ERROR_STATUS.NOT_FOUND);
    }

    return word;
  };

  static update = async (id: number, props: Partial<Word>): Promise<Word> => {
    await Word.update({ id }, props);
    return this.findByIdOrFail(id);
  };

  static updateMany = async (ids: number[], props: Partial<Word>[]): Promise<Word[]> => {
    const queryRunner = AppDataSource.createQueryRunner();
    const wordsLen = ids.length;

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const queryList: Promise<UpdateResult>[] = [];
      for (let i = 0; i < wordsLen; i++) {
        queryList.push(queryRunner.manager.update(Word, { id: ids[i] }, props[i]));
      }
      await Promise.all(queryList);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    return Word.findBy({ id: In(ids) });
  };

  static delete = async (id: number): Promise<void> => {
    await this.findByIdOrFail(id);
    await Word.delete({ id });
  };

  static findByWords = async (words: IWord[]): Promise<Word[]> => {
    return Word.find({ where: words });
  };
}
