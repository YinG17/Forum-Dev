import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentCreateComponent } from './comment-create.component';
import {
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    CommentCreateComponent
  ],
  declarations: [CommentCreateComponent],
  exports: [CommentCreateComponent]
})
export class CommentCreateModule {}
