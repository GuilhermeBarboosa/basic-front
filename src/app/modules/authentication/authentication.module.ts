import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from 'src/app/features/page-login/login/login.component';
import { RegisterComponent } from 'src/app/features/page-login/register/register.component';
import { SharedModule } from '../shared.module';
import { AuthenticationRoutes } from './authentication.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(AuthenticationRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false,
    }),
    ToastrModule.forRoot(),
  ],
})
export class AuthenticationModule {}
