import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment.component';
import { MatCardModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule],
  declarations: [CommentComponent],
  exports: [CommentComponent]
})
export class CommentModule {}
