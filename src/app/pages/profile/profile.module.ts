import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialButtonModule } from 'src/app/shared/modules/material/material-button.module';
import { MaterialFormModule } from 'src/app/shared/modules/material/material-form.module';
import { PostCreateModule } from '../../shared/components/post-create/post-create.module';
import { InfoComponent } from './info/info.component';
import { PostsModule } from '../../shared/components/posts/posts.module';
import { EmptyModule } from 'src/app/shared/components/empty/empty.module';
import { MaterialLayoutModule } from 'src/app/shared/modules/material/material-layout.module';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialLayoutModule,
    MaterialButtonModule,
    MaterialFormModule,
    PostCreateModule,
    RouterModule.forChild(routes),
    PostsModule,
    EmptyModule
  ],
  declarations: [ProfileComponent, InfoComponent]
})
export class ProfileModule {}
