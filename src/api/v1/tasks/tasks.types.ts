import { SORT_TYPES } from '@constants';
import { ParamsId } from '@types';

import { RESULT_CONSTANTS, TARGET_CONSTANTS } from './tasks.constants';
import { Task } from './tasks.entity';

export type GetUncompletedTasksQueryDTO = { limit: number; offset: number; sort: SORT_TYPES; searchWord: string };
export type GetUncompletedTasksResponseDTO = {
  items: Task[];
  pagination: {
    offset: number;
    limit: number;
    total: number;
  };
};

export type GetStatisticQueryDTO = { dateBegin: Date; dateEnd: Date; languageId: number };
export type GetStatisticResponseDTO = { correct: number; incorrect: number };

export type GetTaskParamsDTO = ParamsId;
export type GetTaskResponseDTO = Task;

export type AddTaskBodyDTO = { languageId: number; target: TARGET_CONSTANTS };
export type AddTaskResponseDTO = Task;

export type CompleteTaskParamsDTO = ParamsId;
export type CompleteTaskBodyDTO = { answer: string };
export type CompleteTaskResponseDTO = { result: RESULT_CONSTANTS };
