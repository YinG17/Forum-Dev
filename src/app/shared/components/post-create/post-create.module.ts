import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PostCreateComponent } from './post-create.component';
import { EmoteMenuModule } from '../emote-menu/emote-menu.module';
import { SanitizerModule } from '../../directives/sanitizer.module';
import { FileUploadModule } from '../file-upload/file-upload.module';
import {
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatSlideToggleModule
} from '@angular/material';

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
    FileUploadModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSlideToggleModule
  ],
  declarations: [PostCreateComponent],
  exports: [PostCreateComponent]
})
export class PostCreateModule {}
