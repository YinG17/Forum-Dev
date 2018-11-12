import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialButtonModule } from 'src/app/shared/modules/material/material-button.module';
import { MaterialFormModule } from 'src/app/shared/modules/material/material-form.module';
import { PostCreateModule } from '../../shared/components/post-create/post-create.module';
import { InfoComponent } from './info/info.component';
import { MaterialLayoutModule } from 'src/app/shared/modules/material/material-layout.module';
import { MenuModule } from 'src/app/shared/components/menu/menu.module';
import { PostModule } from 'src/app/shared/components/post/post.module';
import { PaginatorModule } from 'src/app/shared/components/paginator/paginator.module';

const routes: Routes = [
  {
    path: ':name/:category',
    component: ProfileComponent
  },
  {
    path: ':name/:category#action',
    component: ProfileComponent
  },
  {
    path: ':name#:action',
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
    PostModule,
    MenuModule,
    PaginatorModule
  ],
  declarations: [ProfileComponent, InfoComponent]
})
export class ProfileModule {}
