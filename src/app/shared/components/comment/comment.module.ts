import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment.component';
import {
  MatCardModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';
import { SanitizerModule } from '../../directives/sanitizer.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    SanitizerModule.forRoot()
  ],
  declarations: [CommentComponent],
  exports: [CommentComponent]
})
export class CommentModule {}
