import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { InfoComponent } from './info/info.component';
import { ProfileComponent } from './profile.component';

import { MenuModule } from 'src/app/shared/components/menu/menu.module';
import { PostModule } from 'src/app/shared/components/post/post.module';
import { PaginatorModule } from 'src/app/shared/components/paginator/paginator.module';
import { PostCreateModule } from '../../shared/components/post-create/post-create.module';

import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule
} from '@angular/material';
import { InfoEditComponent } from './info-edit/info-edit.component';

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
    PaginatorModule,
    MatInputModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    PostModule,
    MenuModule
  ],
  declarations: [ProfileComponent, InfoComponent, InfoEditComponent]
})
export class ProfileModule {}
