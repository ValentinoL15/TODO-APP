import { ApplicationConfig, provideExperimentalZonelessChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { taskReducer } from './private/states/task.reducer';
import { TaskEffects } from './private/states/task.effects';


export const appConfig: ApplicationConfig = {
  providers: [provideExperimentalZonelessChangeDetection(), provideRouter(routes), provideClientHydration(withEventReplay()),
    
    provideHttpClient(withFetch()), provideAnimationsAsync(), provideToastr(),
    provideAnimations(), provideStore({ tasks: taskReducer }), provideEffects([TaskEffects]), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
