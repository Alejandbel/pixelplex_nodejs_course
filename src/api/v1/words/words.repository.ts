import { REPOSITORY_ERROR_STATUS, RepositoryError } from '@errors';
import { LanguagesRepository } from '@languages';

import { Word } from './words.entity';

export class WordsRepository {
  static create = async (word: string, languageId: number): Promise<Word> => {
    const language = await LanguagesRepository.findById(languageId);

    const createdWord = Word.create({
      word,
      language,
    });

    return Word.save(createdWord);
  };

  static findById = async (id: number): Promise<Word> => {
    const word = await Word.findOneBy({ id });

    if (!word) {
      throw new RepositoryError('Word does not exists', REPOSITORY_ERROR_STATUS.NOT_FOUND);
    }

    return word;
  };

  static update = async (id: number, props: Partial<Word>): Promise<Word> => {
    await Word.update({ id }, props);
    return this.findById(id);
  };

  static delete = async (id: number): Promise<void> => {
    await this.findById(id);
    await Word.delete({ id });
  };
}
