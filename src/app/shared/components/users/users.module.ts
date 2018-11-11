import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { MatCardModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatCardModule, MatTooltipModule],
  declarations: [UsersComponent],
  exports: [UsersComponent]
})
export class UsersModule {}
