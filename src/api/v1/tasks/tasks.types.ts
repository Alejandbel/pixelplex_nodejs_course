import { Task } from './tasks.entity';
import { RESULT_CONSTANTS, TARGET_CONSTANTS } from './tasks.constants';
import { SORT_TYPES } from '@constants';

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

export type GetTaskParamsDTO = { id: number };
export type GetTaskResponseDTO = Task;

export type AddTaskBodyDTO = { languageId: number; target: TARGET_CONSTANTS };
export type AddTaskResponseDTO = Task;

export type CompleteTaskParamsDTO = { id: number };
export type CompleteTaskBodyDTO = { answer: string };
export type CompleteTaskResponseDTO = { result: RESULT_CONSTANTS };
