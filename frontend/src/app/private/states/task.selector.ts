import { createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export const selectTaskState = (state: { tasks: TaskState }) => state.tasks;

export const getTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);

export const selectTaskById = (id: string) =>
  createSelector(getTasks, tasks => tasks.find(t => t._id === id));
