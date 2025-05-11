import { Routes } from '@angular/router';
import { LoginComponent } from './publish/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', loadComponent: () => import('./private/home/home.component').then(m => m.HomeComponent) },
  { path: 'task-detail/:id', loadComponent: () => import('./private/task-components/task-detail/task-detail.component').then(m => m.TaskDetailComponent) }, 
  { path: '**', redirectTo: 'login' }
];
