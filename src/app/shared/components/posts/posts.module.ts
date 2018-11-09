import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatPaginatorModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { EmptyModule } from '../empty/empty.module';
import { RepliesComponent } from './replies/replies.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    EmptyModule
  ],
  declarations: [PostsComponent, RepliesComponent],
  exports: [PostsComponent]
})
export class PostsModule {}
