import { TARGET_CONSTANTS } from './tasks.constants';

let tasksCount = 0;

export class Task {
  id: number;

  constructor(
    public readonly word: string,
    public readonly foreignLanguageId: number,
    public readonly target: TARGET_CONSTANTS
  ) {
    tasksCount += 1;
    this.id = tasksCount;
  }
}
