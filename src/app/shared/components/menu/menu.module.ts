import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MaterialButtonModule } from '../../modules/material/material-button.module';
import { MatBadgeModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MaterialButtonModule, MatBadgeModule],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})
export class MenuModule {}
