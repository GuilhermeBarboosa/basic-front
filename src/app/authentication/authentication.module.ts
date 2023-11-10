import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationRoutes } from './authentication.routing';
import {MatSelectModule} from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
import { LoginComponent } from '../features/page-login/login/login.component';
import { RegisterComponent } from '../features/page-login/register/register.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
     RouterModule.forChild(AuthenticationRoutes),
     NgxMaskModule.forRoot({
      dropSpecialCharacters: false // ao salvar, vai manter a mascara
    }),
     MatFormFieldModule,
     FormsModule,
     MatInputModule,
     ReactiveFormsModule,
     MatSelectModule,
     MatInputModule,
     MatButtonModule,
     ReactiveFormsModule,
     MatCardModule,
     MatDialogModule,
     MatAutocompleteModule,
     MatProgressSpinnerModule,
     MatIconModule,
     HttpClientModule,
     ToastrModule.forRoot(),
  ],
})
export class AuthenticationModule {}
