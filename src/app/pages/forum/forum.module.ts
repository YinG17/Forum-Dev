import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForumComponent } from './forum.component';
import { Routes, RouterModule } from '@angular/router';
import {
  MatSelectModule,
  MatFormFieldModule,
  MatButtonModule
} from '@angular/material';
import { PostCreateModule } from '../post-create/post-create.module';

const routes: Routes = [
  {
    path: '',
    component: ForumComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    PostCreateModule
  ],
  declarations: [ForumComponent]
})
export class ForumModule {}
