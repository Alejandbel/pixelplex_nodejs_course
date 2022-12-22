import { WordsRepository } from './words.repository';
import { IWord } from './words.types';

export const areWordsUnique = async (words: IWord[]): Promise<boolean> => {
  return (await WordsRepository.findByWords(words)).length === 0;
};
