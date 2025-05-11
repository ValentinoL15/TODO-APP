import { createAction, props } from "@ngrx/store";
import { Task } from "../../interfaces";

export const getTasksInitiate = createAction(
  '[Task] Get Tasks Initiate',
  props<{ sortBy?: string; order?: string }>()
);

export const getTasksSuccess = createAction(
  '[Task] Get Tasks Success',
  props<{ tasks: Task[] }>()
);

export const getTasksFailure = createAction(
  '[Task] Get Tasks Failure',
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

