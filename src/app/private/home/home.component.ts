import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { TaskFormComponent } from '../task-components/task-form/task-form.component';

@Component({
  selector: 'app-home',
  imports: [MatToolbarModule,MatIconModule, RouterLink,MatButtonModule,MatCardModule, MatFormFieldModule, MatInputModule,MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent {

  readonly dialog = inject(MatDialog)

  constructor() { }

  openDialog() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
