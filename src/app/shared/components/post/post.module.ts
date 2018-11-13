import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { PostComponent } from './post.component';
import { RepliesModule } from '../replies/replies.module';
import { CommentBoxModule } from '../comment-box/comment-box.module';

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
    CommentBoxModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    RepliesModule,
    MatIconModule,
    CommonModule,
    FormsModule
  ],
  declarations: [PostComponent],
  exports: [PostComponent]
})
export class PostModule {}
