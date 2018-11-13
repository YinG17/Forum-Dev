import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForumComponent } from './forum.component';
import { Routes, RouterModule } from '@angular/router';

import { MenuModule } from 'src/app/shared/components/menu/menu.module';
import { PostModule } from 'src/app/shared/components/post/post.module';
import { UsersModule } from 'src/app/shared/components/users/users.module';
import { PostCreateModule } from 'src/app/shared/components/post-create/post-create.module';
import { PaginatorModule } from 'src/app/shared/components/paginator/paginator.module';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';


import {
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule
} from '@angular/material';


const routes: Routes = [
  {
    path: ':category',
    component: ForumComponent
  },
  {
    path: ':category#post_create',
    component: ForumComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    PostModule,
    UsersModule,
    MenuModule,
    SpinnerModule,
    PaginatorModule,
    PostCreateModule
  ],
  declarations: [ForumComponent]
})
export class ForumModule {}
