import { createReducer, on } from '@ngrx/store';
import { getTasksSuccess, getTasksFailure } from '../states/task.actions';
import { Task } from '../../interfaces';

export interface TaskState {
  tasks: Task[];
  error: string | null;
}

export const initialState: TaskState = {
  tasks: [],
  error: null,
};

export const taskReducer = createReducer(
  initialState,
  on(getTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    error: null,
  })),
  on(getTasksFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
