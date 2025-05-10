import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from '../task-components/task.service';
import { getTasksInitiate, getTasksSuccess, getTasksFailure } from '../states/task.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, pipe } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TaskEffects {
    loadTasks$;

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private toastr: ToastrService
  ) {
    
    this.loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTasksInitiate),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((response : any) => getTasksSuccess({ tasks: response.tasks })),
          catchError((error) => {
            this.toastr.error(error.message, 'Error al obtener las tareas');
            return of(getTasksFailure({ error: error.message }));
          })
        )
      )
    )
  );
  }

  
}
