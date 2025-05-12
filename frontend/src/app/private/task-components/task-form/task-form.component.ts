import { ChangeDetectionStrategy, Component, Inject, inject, OnInit, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { getTasksInitiate, updateTaskInitiate } from '../../states/task.actions';

@Component({
  selector: 'app-task-form',
  imports: [MatInputModule, MatFormFieldModule, MatSelectModule, MatSelectModule, MatChipsModule, MatIconModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskFormComponent {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly labels = signal<any[]>([]);

  //INJECTS
  readonly announcer = inject(LiveAnnouncer);
  readonly fb = inject(FormBuilder);
  readonly taskService = inject(TaskService);
  readonly dialogRef = inject(MatDialogRef<TaskFormComponent>);
  readonly toastr = inject(ToastrService)
  readonly state = inject(Store)

  //VARIABLES
  form: FormGroup
  readonly addOnBlur = true;
  isEditMode: boolean = false;
  formSubmitted: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.isEditMode = !!this.data && !!this.data._id;

    this.form = this.fb.group({
      title: [data.title || '', Validators.required],
      description: [data.description || ''],
      priority: [data.priority || '', Validators.required],
      labels: [data.labels || []],
      state: [data.state || 'Nueva'],
    });

    // Cargar etiquetas iniciales
    if (data.labels) {
      this.labels.set(this.data.labels);
    }

  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.labels.update((labels) => [...labels, { name: value }]);
      this.form.get('labels')?.setValue(this.labels());
    }
    event.chipInput!.clear();
  }

  remove(label: any): void {
    this.labels.update((labels) => labels.filter((l) => l !== label));
    this.form.get('labels')?.setValue(this.labels());
  }

  edit(label: any, event: any): void {
    const value = event.target.value.trim();
    if (!value) {
      this.remove(label);
      return;
    }
    this.labels.update((labels) =>
      labels.map((l) => (l === label ? { name: value } : l))
    );
    this.form.get('labels')?.setValue(this.labels());
  }

  sendForm() {
    const formulario = {
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      priority: this.form.get('priority')?.value,
      state: this.form.get('state')?.value,
      labels: this.labels(),
      _id: this.data?._id
    };

    this.formSubmitted = true;

    if (this.form.valid) {
      if (formulario._id) {
        // Modo edición
        this.state.dispatch(updateTaskInitiate({ task: formulario }));
        this.dialogRef.close(formulario);
      } else {
        // Modo creación
        this.taskService.createTask(formulario).subscribe({
          next: (res: any) => {
            this.form.reset();
            this.dialogRef.close(res);
            this.toastr.success(res.message, 'Tarea creada');
            this.state.dispatch(getTasksInitiate({}));
          },
          error: (err: any) => {
            console.log(err);
            this.toastr.error('Error al crear la tarea', 'Error');
          }
        });
      }
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
