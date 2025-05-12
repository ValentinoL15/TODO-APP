import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-components/task-form/task-form.component';
import { TaskListComponent } from '../task-components/task-list/task-list.component';
import { Store } from '@ngrx/store';
import { getTasksInitiate } from '../states/task.actions';
import { Observable } from 'rxjs';
import { getTasks } from '../states/task.selector';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-home',
  imports: [MatToolbarModule, MatIconModule, RouterLink, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatDialogModule, TaskListComponent, CommonModule, MatSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit {

  readonly dialog = inject(MatDialog)
  readonly store = inject(Store)

  tasks$: Observable<any> = this.store.select(getTasks);
  filtersVisible = false;

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;

    // Bloquear/desbloquear scroll del body
    if (this.filtersVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeFilters(event: Event) {
    if (event.target === event.currentTarget) {
      this.toggleFilters();
    }
  }

  selectedFilters: {
    state: string[];
    priority: string[];
    labels: string[];
  } = {
      state: [],
      priority: [],
      labels: []
    };

  constructor() { }
  stateCounts: { [key: string]: number } = {};
  priorityCounts: { [key: string]: number } = {};

  ngOnInit(): void {
    this.fetchTasks();

    this.tasks$.subscribe(tasks => {
      // Contar estados
      this.stateCounts = tasks.reduce((acc: any, task: any) => {
        const state = task.state;
        acc[state] = (acc[state] || 0) + 1;
        return acc;
      }, {});

      // Contar prioridades
      this.priorityCounts = tasks.reduce((acc: any, task: any) => {
        const priority = task.priority;
        acc[priority] = (acc[priority] || 0) + 1;
        return acc;
      }, {});
    });
  }

  fetchTasks() {
    this.store.dispatch(getTasksInitiate({
      filters: {
        state: [...this.selectedFilters.state],
        priority: [...this.selectedFilters.priority],
        labels: [...this.selectedFilters.labels]
      }
    }));
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
      this.fetchTasks();
    });
  }

  onSortChange(value: string) {
    const [sortBy, order] = value.split('_');
    this.store.dispatch(getTasksInitiate({
      sortBy,
      order: order as 'asc' | 'desc',
    }));
  }


  onStateChange(selectedStates: string[]) {
    this.selectedFilters = {
      ...this.selectedFilters,
      state: [...selectedStates]
    };
    this.fetchTasks();
  }

  onPriorityChange(selectedPriorities: string[]) {
    this.selectedFilters = {
      ...this.selectedFilters,
      priority: [...selectedPriorities]
    };
    this.fetchTasks();
  }
}
