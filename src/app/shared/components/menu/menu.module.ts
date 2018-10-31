import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MaterialButtonModule } from '../../modules/material/material-button.module';

@NgModule({
  imports: [CommonModule, MaterialButtonModule],
  declarations: [MenuComponent],
  exports: [MenuComponent]
})
export class MenuModule {}
