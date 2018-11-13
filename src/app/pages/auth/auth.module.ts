import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';

import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule
} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuthComponent]
})
export class AuthModule {}
