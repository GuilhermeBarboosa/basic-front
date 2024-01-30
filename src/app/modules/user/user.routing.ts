import { Routes } from '@angular/router';
import { CreateUserComponent } from 'src/app/features/user/create-user/create-user.component';
import { EditUserComponent } from 'src/app/features/user/edit-user/edit-user.component';
import { InfoUserComponent } from 'src/app/features/user/info-user/info-user.component';
import { UserTableComponent } from 'src/app/features/user/user-table/user-table.component';
import { AuthGuardService } from 'src/app/guards/auth-guard.service';
import { ProfileGuardService } from 'src/app/guards/profile-guard.service';
import { roles } from 'src/roles';

export const UserRoutes: Routes = [
  {
    path: '',
    component: UserTableComponent,
  },
  {
    path: 'register',
    component: CreateUserComponent,
    canActivate: [AuthGuardService],
    data: {
      rolesArray:[
         {
          role: roles.ROLE_ADMIN
         },
        //  {
        //   role: roles.ROLE_USER
        //  }
      ]
    },
  },
  {
    path: 'edit/:id',
    component: EditUserComponent,
    canActivate: [ProfileGuardService],
  },
  {
    path: 'info/:id',
    component: InfoUserComponent,
  },
];
