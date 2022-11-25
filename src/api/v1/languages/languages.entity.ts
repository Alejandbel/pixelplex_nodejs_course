let languagesCount = 0;

export class Language {
  id: number;

  constructor(public readonly title: string, public readonly code: string) {
    languagesCount += 1;
    this.id = languagesCount;
  }
}

export interface ILanguage {
  title: string;
  code: string;
}
