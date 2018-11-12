import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepliesComponent } from './replies.component';
import { MatCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, MatCardModule, FormsModule],
  declarations: [RepliesComponent],
  exports: [RepliesComponent]
})
export class RepliesModule {}
