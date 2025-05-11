import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../../interfaces';
import { CommonModule, NgClass } from '@angular/common';
import { TaskService } from '../task.service';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-task-detail',
  imports: [MatCardModule,MatChipsModule, CommonModule,MatButtonModule, RouterLink],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailComponent implements OnInit{
  readonly route = inject(ActivatedRoute)
  readonly store = inject(Store)
  readonly taskService = inject(TaskService)
  readonly cdr = inject(ChangeDetectorRef)
  id:any
  task$: Observable<Task | null> = this.taskService.task$;

  constructor() {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskService.getTaskById(id);
    }
  }

}
