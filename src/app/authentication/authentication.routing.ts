import { Routes } from '@angular/router';
import { LoginComponent } from '../../feature/page-login/login/login.component';
import { RegisterComponent } from '../../feature/page-login/register/register.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],

  },
];
