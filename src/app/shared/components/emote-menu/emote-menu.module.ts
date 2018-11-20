import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmoteMenuComponent } from './emote-menu.component';
import {
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [EmoteMenuComponent],
  exports: [EmoteMenuComponent]
})
export class EmoteMenuModule {}
