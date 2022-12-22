import { Language } from './languages.entity';

export class LanguageDTO {
  id: number;
  title: string;
  code: string;

  constructor(language: Language) {
    const { id, title, code } = language;
    this.id = id;
    this.title = title;
    this.code = code;
  }
}
