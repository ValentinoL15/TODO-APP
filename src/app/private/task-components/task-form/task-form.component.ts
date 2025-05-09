import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [MatInputModule, MatFormFieldModule,MatSelectModule,MatSelectModule,MatChipsModule,MatIconModule,MatButtonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TaskFormComponent {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly fruits = signal<any[]>([]);

  //INJECTS
  readonly announcer = inject(LiveAnnouncer);
  readonly fb = inject(FormBuilder);

  //VARIABLES
  form: FormGroup
  readonly addOnBlur = true;

  constructor() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      status: ['Nueva'],
      labels: [[]]
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Agrega un valor
    if (value) {
      this.fruits.update(fruits => [...fruits, {name: value}]);
    }

    // Limpia el valor del input
    event.chipInput!.clear();
  }

  remove(fruit: any): void {
    this.fruits.update(fruits => {
      const index = fruits.indexOf(fruit);
      if (index < 0) {
        return fruits;
      }

      fruits.splice(index, 1);
      this.announcer.announce(`Removed ${fruit.name}`);
      return [...fruits];
    });
  }

  edit(fruit: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    this.fruits.update(fruits => {
      const index = fruits.indexOf(fruit);
      if (index >= 0) {
        fruits[index].name = value;
        return [...fruits];
      }
      return fruits;
    });
  }

  sendForm(){
    
  }
}
