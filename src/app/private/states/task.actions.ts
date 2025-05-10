import { createAction, props } from "@ngrx/store";
import { Task } from "../../interfaces";

export const getTasksInitiate = createAction('[Task] Get Tasks Initiate');

export const getTasksSuccess = createAction(
  '[Task] Get Tasks Success',
  props<{ tasks: Task[] }>()
);

export const getTasksFailure = createAction(
  '[Task] Get Tasks Failure',
  props<{ error: string }>()
);

