import { Card } from './cards.entity';

export class CardDTO {
  id: number;
  nativeLanguageId: number;
  foreignLanguageId: number;
  nativeWord: string;
  foreignWord: string;

  constructor(card: Card) {
    const { id, nativeWord, foreignWord } = card;
    this.id = id;
    this.nativeLanguageId = nativeWord.languageId;
    this.foreignLanguageId = foreignWord.languageId;
    this.nativeWord = nativeWord.word;
    this.foreignWord = foreignWord.word;
  }
}
