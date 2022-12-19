import { LanguagesRepository } from './languages.repository';

export const isCodeUnique = async (code: string): Promise<boolean> => {
  let isUnique = true;

  if (!(await LanguagesRepository.findByCode(code))) {
    isUnique = false;
  }

  return isUnique;
};
