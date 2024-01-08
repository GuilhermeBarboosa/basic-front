import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from 'src/app/features/page-login/profile/profile.component';
import { SharedModule } from '../shared.module';
import { ProfileRoutes } from './profile.routing';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ProfileRoutes),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    ToastrModule.forRoot(),
  ],
})
export class ProfileModule {}
