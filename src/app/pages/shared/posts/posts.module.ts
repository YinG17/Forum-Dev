import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, FormsModule, MatCardModule],
  declarations: [PostsComponent],
  exports: [PostsComponent]
})
export class PostsModule {}
