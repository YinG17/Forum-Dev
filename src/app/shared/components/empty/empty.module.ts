import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from './empty.component';
import { SpinnerModule } from '../spinner/spinner.module';

@NgModule({
  imports: [CommonModule, SpinnerModule],
  declarations: [EmptyComponent],
  exports: [EmptyComponent]
})
export class EmptyModule {}