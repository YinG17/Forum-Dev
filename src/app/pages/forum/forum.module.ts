import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForumComponent } from './forum.component';
import { Routes, RouterModule } from '@angular/router';

import { MenuModule } from 'src/app/shared/components/menu/menu.module';
import { PostModule } from 'src/app/shared/components/post/post.module';
import { UsersModule } from 'src/app/shared/components/users/users.module';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';
import { PaginatorModule } from 'src/app/shared/components/paginator/paginator.module';
import { PostCreateModule } from 'src/app/shared/components/post-create/post-create.module';

import {
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule
} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: ForumComponent
  },
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
    RouterModule.forChild(routes),
    MatFormFieldModule,
    PostCreateModule,
    PaginatorModule,
    MatButtonModule,
    SpinnerModule,
    MatCardModule,
    CommonModule,
    UsersModule,
    FormsModule,
    PostModule,
    MenuModule
  ],
  declarations: [ForumComponent]
})
export class ForumModule {}
