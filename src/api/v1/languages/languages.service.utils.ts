import { LanguagesRepository } from './languages.repository';

export const isCodeUnique = async (code: string): Promise<boolean> => {
  return !(await LanguagesRepository.findByCode(code));
};
