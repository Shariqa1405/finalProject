import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { TemplateComponent } from './template/template.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'templates', component: TemplateComponent },
];
