import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MaterialButtonModule } from 'src/app/shared/modules/material/material-button.module';
import { MaterialFormModule } from 'src/app/shared/modules/material/material-form.module';
import { MaterialLayoutModule } from 'src/app/shared/modules/material/material-layout.module';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialFormModule,
    MaterialButtonModule,
    MaterialLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuthComponent]
})
export class AuthModule {}
