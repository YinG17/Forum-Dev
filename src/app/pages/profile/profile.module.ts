import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { InfoComponent } from './info/info.component';
import { ProfileComponent } from './profile.component';

import { MenuModule } from 'src/app/shared/components/menu/menu.module';
import { PostModule } from 'src/app/shared/components/post/post.module';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';
import { PostCreateModule } from '../../shared/components/post-create/post-create.module';

import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule
} from '@angular/material';

const routes: Routes = [
  {
    path: ':name/:category',
    component: ProfileComponent
  },
  {
    path: ':name/:category#action',
    component: ProfileComponent
  },
  {
    path: ':name#:action',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatFormFieldModule,
    PostCreateModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    SpinnerModule,
    CommonModule,
    FormsModule,
    PostModule,
    MenuModule
  ],
  declarations: [ProfileComponent, InfoComponent]
})
export class ProfileModule {}
