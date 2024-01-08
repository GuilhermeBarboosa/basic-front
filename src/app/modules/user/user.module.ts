import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { CreateUserComponent } from 'src/app/features/user/create-user/create-user.component';
import { EditUserComponent } from 'src/app/features/user/edit-user/edit-user.component';
import { InfoUserComponent } from 'src/app/features/user/info-user/info-user.component';
import { UserTableComponent } from 'src/app/features/user/user-table/user-table.component';
import { SharedModule } from '../shared.module';
import { UserRoutes } from './user.routing';

@NgModule({
  declarations: [
    CreateUserComponent,
    EditUserComponent,
    UserTableComponent,
    InfoUserComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(UserRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
})
export class UserModule {}
