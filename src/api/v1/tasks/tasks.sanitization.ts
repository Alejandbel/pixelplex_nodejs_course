import { checkSchema } from 'express-validator';

export class TasksSanitization {
  static getUncompletedTasks = checkSchema({
    limit: {
      toInt: true,
    },
    offset: {
      toInt: true,
    },
  });

  static getStatistic = checkSchema({
    dateBegin: {
      toDate: true,
    },
    dateEnd: {
      toDate: true,
    },
    languageId: {
      toInt: true,
    },
  });

  static getTask = checkSchema({
    id: {
      toInt: true,
    },
  });

  static addTask = checkSchema({
    languageId: {
      in: ['body'],
      toInt: true,
    },
  });

  static completeTask = checkSchema({
    id: {
      in: ['params'],
      toInt: true,
    },
  });
}
