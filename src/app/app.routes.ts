import { Routes } from '@angular/router';
import { LoginComponent } from './publish/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', loadComponent: () => import('./private/home/home.component').then(m => m.HomeComponent) },
  { path: '', redirectTo: '/login', pathMatch: 'full' } 
];
