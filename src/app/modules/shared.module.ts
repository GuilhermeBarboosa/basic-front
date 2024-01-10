import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonGreenComponent } from '../components/button-green/button-green.component';
import { ButtonRedComponent } from '../components/button-red/button-red.component';
import { ButtonYellowComponent } from '../components/button-yellow/button-yellow.component';
import { DialogComponent } from '../components/dialog/dialog.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    DialogComponent,
    NavbarComponent,
    ButtonGreenComponent,
    ButtonRedComponent,
    ButtonYellowComponent,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations:[
    SidebarComponent,
    DialogComponent,
    NavbarComponent,
    ButtonGreenComponent,
    ButtonRedComponent,
    ButtonYellowComponent,
  ]
})
export class SharedModule {}
