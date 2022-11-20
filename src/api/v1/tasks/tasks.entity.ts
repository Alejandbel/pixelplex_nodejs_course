let tasksCount = 0;

export class Task {
  id: number;

  constructor(
    public readonly word: string,
    public readonly foreignLanguageId: number,
    public readonly target: 'to_foreign' | 'to_native'
  ) {
    tasksCount += 1;
    this.id = tasksCount;
  }
}
