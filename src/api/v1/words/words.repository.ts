import { REPOSITORY_ERROR_STATUS, RepositoryError } from '@errors';
import { LanguagesRepository } from '@languages';

import { Word } from './words.entity';

export class WordsRepository {
  static create = async (word: string, languageId: number, userId: number): Promise<Word> => {
    const language = await LanguagesRepository.findByIdOrFail(languageId);

    const createdWord = Word.create({
      word,
      language,
      userId,
    });

    return Word.save(createdWord);
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

  static delete = async (id: number): Promise<void> => {
    await this.findByIdOrFail(id);
    await Word.delete({ id });
  };
}
