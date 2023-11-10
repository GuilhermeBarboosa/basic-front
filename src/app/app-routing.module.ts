import { AuthGuardService } from './guards/auth-guard.service';


import { LoginGuardService } from './guards/login-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserTableComponent } from './features/user/user-table/user-table.component';
import { CreateUserComponent } from './features/user/create-user/create-user.component';
import { EditUserComponent } from './features/user/edit-user/edit-user.component';
import { InfoUserComponent } from './features/user/info-user/info-user.component';
import { ProfileComponent } from './features/page-login/profile/profile.component';


export const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'user',
    children: [
      {
        path: '',
        component: UserTableComponent,
      },
      {
        path: 'register',
        component: CreateUserComponent,
      },
      {
        path: 'edit/:id',
        component: EditUserComponent,
      },
      {
        path: 'info/:id',
        component: InfoUserComponent,
      },
    ],
    canActivate: [LoginGuardService],
  },
  {
    path: 'profile',
    children: [
      {
        path: '',
        component: ProfileComponent,
      },
    ],
    canActivate: [LoginGuardService],
  },
  {
    path: '',
    redirectTo: 'authentication/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
