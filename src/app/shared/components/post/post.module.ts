import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { PostComponent } from './post.component';
import { RepliesModule } from '../replies/replies.module';
import { CommentBoxModule } from '../comment-box/comment-box.module';

import {
  MatCardModule,
  MatPaginatorModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
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
    CommonModule,
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    RepliesModule,
    MatIconModule,
    CommentBoxModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PostComponent],
  exports: [PostComponent]
})
export class PostModule {}
