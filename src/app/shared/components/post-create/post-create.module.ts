import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './post-create.component';
import { FormsModule } from '@angular/forms';
import { MaterialFormModule } from '../../modules/material/material-form.module';
import { MatCardModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialFormModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [PostCreateComponent],
  exports: [PostCreateComponent]
})
export class PostCreateModule {}
