import { createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export const selectTaskState = (state: { tasks: TaskState }) => state.tasks;

export const getTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);