import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MatBadgeModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatBadgeModule],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})
export class MenuModule {}
