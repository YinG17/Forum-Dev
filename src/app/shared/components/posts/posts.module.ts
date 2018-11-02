import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatPaginatorModule } from '@angular/material';
import { EmptyModule } from '../empty/empty.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
    EmptyModule
  ],
  declarations: [PostsComponent],
  exports: [PostsComponent]
})
export class PostsModule {}
