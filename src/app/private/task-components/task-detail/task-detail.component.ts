import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  imports: [],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailComponent {

}
