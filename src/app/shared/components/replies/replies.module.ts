import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RepliesComponent } from './replies.component';
import {
  MatCardModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule
  ],
  declarations: [RepliesComponent],
  exports: [RepliesComponent]
})
export class RepliesModule {}
