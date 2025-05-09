import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly emailUser: string = 'user@gmail.com';
  readonly passwordUser: string = 'usuario123';
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  errorMessage = signal('');
  errorMessagePassword = signal('');
  hide = signal(true);
  submitted = signal(false);

  private router = inject(Router)

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges,)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessagePassword());
  }


  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('El email es requerido');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Email no válido');
    }
    else if (this.submitted() && this.email.value !== this.emailUser) {
      this.errorMessage.set('El email es incorrecto');
    }
    else {
      this.errorMessage.set('');
    }
  }

  updateErrorMessagePassword() {
    if (this.password.hasError('required')) {
      this.errorMessagePassword.set('La contraseña es requerida');
    } else if (this.password.hasError('minlength')) {
      this.errorMessagePassword.set('La contraseña debe tener al menos 6 caracteres');
    } else if (this.submitted() && this.password.value !== this.passwordUser) {
      this.errorMessagePassword.set('La contraseña es incorrecta');
    }
    else {
      this.errorMessagePassword.set('');
    }
  }

  ingresar() {
    this.submitted.set(true);

    // Limpiar errores personalizados previos
    this.email.setErrors(null);
    this.password.setErrors(null);

    // Validar credenciales
    if (this.email.value !== this.emailUser) {
      this.email.setErrors({ incorrect: true });
    }
    if (this.password.value !== this.passwordUser) {
      this.password.setErrors({ incorrect: true });
    }

    // Actualizar mensajes de error(si los hay)
    this.updateErrorMessage();
    this.updateErrorMessagePassword();

    // Si no hay errores, ingresar a la aplicación
    if (this.email.valid && this.password.valid && this.email.value === this.emailUser && this.password.value === this.passwordUser) {
      this.router.navigate(['/home']);
    }

  }
}
