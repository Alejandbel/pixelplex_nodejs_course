import { TARGET_CONSTANTS } from './tasks.constants';
import { Task } from './tasks.entity';

export class TaskDTO {
  id: number;
  word: string;
  nativeLanguageId: number;
  foreignLanguageId: number;
  target: TARGET_CONSTANTS;

  constructor(task: Task) {
    const { id, target, card } = task;
    this.id = id;
    this.target = target;

    switch (target) {
      case TARGET_CONSTANTS.TO_FOREIGN: {
        this.word = card.nativeWord.word;
        break;
      }
      case TARGET_CONSTANTS.TO_NATIVE: {
        this.word = card.foreignWord.word;
      }
    }

    this.foreignLanguageId = card.foreignWord.languageId;
    this.nativeLanguageId = card.nativeWord.languageId;
  }
}
