import { createAction, props } from "@ngrx/store";
import { Task } from "../../interfaces";

export const getTasksInitiate = createAction(
  '[Task] Get Tasks Initiate',
  props<{ sortBy?: string; order?: string; filters?: { state?: string[]; priority?: string[]; labels?: string[]}}>()
);

export const getTasksSuccess = createAction(
  '[Task] Get Tasks Success',
  props<{ tasks: Task[] }>()
);

export const getTasksFailure = createAction(
  '[Task] Get Tasks Failure',
  props<{ error: string }>()
);

export const getTaskById = createAction(
  '[Task Detail] Get Task By ID',
  props<{ id: string }>()
);

export const getTaskByIdSuccess = createAction(
  '[Task Detail] Get Task By ID Success',
  props<{ task: Task }>()
);

export const getTaskByIdFailure = createAction(
  '[Task Detail] Get Task By ID Failure',
  props<{ error: string }>()
);

export const updateTaskInitiate = createAction(
  '[Task] Update Task Initiate',
  props<{ task: Task }>()
);

export const updateTaskSuccess = createAction(
  '[Task] Update Task Success',
  props<{ task: Task }>()
);

export const updateTaskFailure = createAction(
  '[Task] Update Task Failure',
  props<{ error: string }>()
);

