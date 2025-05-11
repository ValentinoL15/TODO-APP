import { createReducer, on } from '@ngrx/store';
import { getTasksSuccess, getTasksFailure, updateTaskSuccess, updateTaskFailure } from '../states/task.actions';
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
  // Get tasks
  on(getTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    error: null,
  })),
  on(getTasksFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  // Update task
  on(updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => t._id === task._id ? task : t),
    error: null,
  })),
  on(updateTaskFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);