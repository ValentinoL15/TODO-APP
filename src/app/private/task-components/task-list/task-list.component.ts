import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../../../interfaces';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Store } from '@ngrx/store';
import { ConfirmDialogComponent } from '../../../../utils/dialog.component';
import { getTasksInitiate, updateTaskInitiate } from '../../states/task.actions';

@Component({
  selector: 'app-task-list',
  imports: [MatCardModule, NgClass, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() editTask = new EventEmitter<any>();

  //INJECTS
  readonly taskService = inject(TaskService);
  readonly toastr = inject(ToastrService)
  readonly cdr = inject(ChangeDetectorRef);
  readonly dialog = inject(MatDialog)
  readonly store = inject(Store)

  constructor() { }

  openDeleteDialog(id:any) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: { message: '¿Estás seguro de que deseas eliminar esta tarjeta?' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.taskService.deleteTask(id).subscribe({
        next: (res : any) => {
          this.toastr.success(res.message)
          this.store.dispatch(getTasksInitiate({}))
        },
        error: (err : any) => {
          this.toastr.error(err.message, 'Error')
        }
      })
    }
  });
}

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (res: any) => {
        this.tasks = res.tasks
        this.cdr.detectChanges()
      },
      error: (err: any) => {
        this.toastr.error(err.message, 'Error')
      }
    })
  }

  onEdit(task: any) {
    this.editTask.emit(task);
  }

  openEditDialog(task: any): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '500px',
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(updateTaskInitiate({ task: result }));
      }
    });
  }

}
