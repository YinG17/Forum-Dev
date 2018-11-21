import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './post-create.component';
import { EmoteMenuModule } from '../emote-menu/emote-menu.module';
import {
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatSlideToggleModule
} from '@angular/material';
import { SanitizerModule } from '../../directives/sanitizer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    EmoteMenuModule,
    SanitizerModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSlideToggleModule
  ],
  declarations: [PostCreateComponent],
  exports: [PostCreateComponent]
})
export class PostCreateModule {}
