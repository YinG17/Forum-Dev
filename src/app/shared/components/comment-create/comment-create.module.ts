import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmoteMenuModule } from '../emote-menu/emote-menu.module';
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
    EmoteMenuModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  declarations: [CommentCreateComponent],
  exports: [CommentCreateComponent]
})
export class CommentCreateModule {}
