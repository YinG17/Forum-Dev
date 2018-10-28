import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialButtonModule } from 'src/app/shared/modules/material/material-button.module';
import { MaterialFormModule } from 'src/app/shared/modules/material/material-form.module';
import { MatInputModule } from '@angular/material';
import { PostCreateModule } from '../post-create/post-create.module';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialButtonModule,
    MaterialFormModule,
    MatInputModule,
    PostCreateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule {}
