import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { PostComponent } from './post.component';
import { CommentModule } from '../comment/comment.module';
import { SanitizerModule } from '../../directives/sanitizer.module';
import { CommentCreateModule } from '../comment-create/comment-create.module';

import {
  MatPaginatorModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule
} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: PostComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatPaginatorModule,
    MatFormFieldModule,
    CommentCreateModule,
    MatButtonModule,
    SanitizerModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    CommentModule,
    MatIconModule,
    CommonModule,
    FormsModule
  ],
  declarations: [PostComponent],
  exports: [PostComponent]
})
export class PostModule {}
