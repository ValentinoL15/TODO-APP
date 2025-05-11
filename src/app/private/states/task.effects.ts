import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from '../task-components/task.service';
import { getTasksInitiate, getTasksSuccess, getTasksFailure, updateTaskInitiate, updateTaskSuccess, updateTaskFailure } from '../states/task.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, pipe } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../../interfaces';

@Injectable()
export class TaskEffects {
    loadTasks$;
    updateTask$;

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private toastr: ToastrService
  ) {
    this.loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTasksInitiate),
      mergeMap((action) => {
        // Validación para asegurarse de que order sea "asc" o "desc"
        const order = action.order === 'asc' || action.order === 'desc' ? action.order : 'asc';
        const sortBy = action.sortBy || 'createdAt'; // Puedes usar un valor por defecto aquí también

        return this.taskService.getTasks(sortBy, order).pipe(
          map((response: any) => getTasksSuccess({ tasks: response.tasks })),
          catchError((error) => {
            this.toastr.error(error.message, 'Error al obtener las tareas');
            return of(getTasksFailure({ error: error.message }));
          })
        );
      })
    )
  );

  this.updateTask$ = createEffect(() =>
  this.actions$.pipe(
    ofType(updateTaskInitiate),
    mergeMap(({ task }) =>
      this.taskService.updateTask(task._id, task).pipe(
        map((updatedTask: Task) => {
          this.toastr.success('Tarea actualizada');
          return updateTaskSuccess({ task: updatedTask });
        }),
        catchError((error) => {
          this.toastr.error(error.message, 'Error al actualizar tarea');
          return of(updateTaskFailure({ error: error.message }));
        })
      )
    )
  )
);
  }

  

  

  
}
