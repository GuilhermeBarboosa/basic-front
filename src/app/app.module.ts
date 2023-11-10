import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './features/page-login/login/login.component';
import { RegisterComponent } from './features/page-login/register/register.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ToastrModule } from 'ngx-toastr';
import { DialogComponent } from './components/dialog/dialog.component';
import { ButtonGreenComponent } from './components/button-green/button-green.component';
import { ButtonRedComponent } from './components/button-red/button-red.component';
import { ButtonYellowComponent } from './components/button-yellow/button-yellow.component';
import { ProfileComponent } from './features/page-login/profile/profile.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateUserComponent } from './features/user/create-user/create-user.component';
import { EditUserComponent } from './features/user/edit-user/edit-user.component';
import { UserTableComponent } from './features/user/user-table/user-table.component';
import { InfoUserComponent } from './features/user/info-user/info-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SidebarComponent,
    NavbarComponent,
    DialogComponent,
    ButtonGreenComponent,
    ButtonRedComponent,
    ButtonYellowComponent,
    CreateUserComponent,
    EditUserComponent,
    UserTableComponent,
    InfoUserComponent,
  ],
  imports: [
    BrowserModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false // ao salvar, vai manter a mascara
    }),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    HttpClientModule,
    MatPaginatorModule,
    AppRoutingModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
