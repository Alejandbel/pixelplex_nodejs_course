let laguagesCount = 0;

export class Language {
  id: number;

  constructor(public readonly title: string, public readonly code: string) {
    laguagesCount += 1;
    this.id = laguagesCount;
  }
}

export interface ILanguage {
  title: string;
  code: string;
}
