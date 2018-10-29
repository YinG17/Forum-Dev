import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForumComponent } from './forum.component';
import { Routes, RouterModule } from '@angular/router';
import {
  MatSelectModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule
} from '@angular/material';
import { PostCreateModule } from '../shared/post-create/post-create.module';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { MenuComponent } from './menu/menu.component';

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
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    PostCreateModule
  ],
  declarations: [ForumComponent, UsersComponent, PostsComponent, MenuComponent]
})
export class ForumModule {}
