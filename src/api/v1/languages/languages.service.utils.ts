import { LanguagesRepository } from './languages.repository';

export const isCodeUnique = async (code: string): Promise<boolean> => {
  let isUnique = false;

  if (!(await LanguagesRepository.findByCode(code))) {
    isUnique = true;
  }

  return isUnique;
};
