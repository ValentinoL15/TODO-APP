import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { TaskFormComponent } from '../task-components/task-form/task-form.component';
import { TaskListComponent } from '../task-components/task-list/task-list.component';
import { Store } from '@ngrx/store';
import { getTasksInitiate } from '../states/task.actions';
import { Observable } from 'rxjs';
import { Task } from '../../interfaces';
import { getTasks } from '../states/task.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MatToolbarModule,MatIconModule, RouterLink,MatButtonModule,MatCardModule, MatFormFieldModule, MatInputModule,MatDialogModule, TaskListComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit{

  readonly dialog = inject(MatDialog)
  readonly store = inject(Store)

  tasks$: Observable<any> = this.store.select(getTasks);

  constructor() { }

  ngOnInit(): void {
    this.store.dispatch(getTasksInitiate())
  }

  openDialog() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '500px',
      data: {
        title: '',
        description: '',
        priority: '',
        state: 'Nueva',
        labels: []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditDialog(task: any) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '500px',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Resultado del dialog:', result);
      // Podrías actualizar la lista si se necesita
    });
  }
}
