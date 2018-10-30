import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForumComponent } from './forum.component';
import { Routes, RouterModule } from '@angular/router';
import {
  MatSelectModule,
  MatFormFieldModule,
  MatButtonModule
} from '@angular/material';
import { PostCreateModule } from '../shared/post-create/post-create.module';
import { UsersComponent } from './users/users.component';
import { MenuComponent } from './menu/menu.component';
import { PostsModule } from '../shared/posts/posts.module';
import { EmptyModule } from '../shared/empty/empty.module';

const routes: Routes = [
  {
    path: '',
    component: ForumComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    PostCreateModule,
    PostsModule,
    EmptyModule
  ],
  declarations: [ForumComponent, UsersComponent, MenuComponent]
})
export class ForumModule {}
