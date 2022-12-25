import { SORT_TYPES } from '@constants';
import { ParamsId } from '@types';

import { RESULT_CONSTANTS, TARGET_CONSTANTS } from './tasks.constants';
import { TaskDTO } from './tasks.service.mapper';

export type GetUncompletedTasksQueryDTO = { limit: number; offset: number; sort: SORT_TYPES; searchWord: string };
export type GetUncompletedTasksResponseDTO = {
  items: TaskDTO[];
  pagination: {
    offset: number;
    limit: number;
    total: number;
  };
};

export type GetStatisticQueryDTO = { dateBegin: Date; dateEnd: Date; languageId: number };
export type GetStatisticResponseDTO = { correct: number; incorrect: number };

export type GetTaskParamsDTO = ParamsId;
export type GetTaskResponseDTO = TaskDTO;

export type AddTaskBodyDTO = { languageId: number; target: TARGET_CONSTANTS };
export type AddTaskResponseDTO = TaskDTO;

export type CompleteTaskParamsDTO = ParamsId;
export type CompleteTaskBodyDTO = { answer: string };
export type CompleteTaskResponseDTO = { result: RESULT_CONSTANTS };
