import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment.component';
import {
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule
} from '@angular/material';
import { EmoteMenuModule } from '../emote-menu/emote-menu.module';
import { SanitizerModule } from '../../directives/sanitizer.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    EmoteMenuModule,
    MatFormFieldModule,
    SanitizerModule.forRoot()
  ],
  declarations: [CommentComponent],
  exports: [CommentComponent]
})
export class CommentModule {}
