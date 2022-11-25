let cardsCount = 0;

export class Card {
  id: number;

  constructor(
    public readonly nativeLanguageId: number,
    public readonly foreignLanguageId: number,
    public readonly nativeWord: string,
    public readonly foreignWord: string
  ) {
    cardsCount += 1;
    this.id = cardsCount;
  }
}
