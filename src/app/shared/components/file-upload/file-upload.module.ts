import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { MatIconModule } from '@angular/material';
import { SanitizerModule } from '../../directives/sanitizer.module';

@NgModule({
  imports: [CommonModule, MatIconModule, SanitizerModule],
  declarations: [FileUploadComponent],
  exports: [FileUploadComponent]
})
export class FileUploadModule {}
