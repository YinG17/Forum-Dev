import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForumComponent } from './forum.component';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateModule } from '../../shared/components/post-create/post-create.module';
import { UsersComponent } from './users/users.component';
import { PostsModule } from '../../shared/components/posts/posts.module';
import { MaterialFormModule } from 'src/app/shared/modules/material/material-form.module';
import { MaterialButtonModule } from 'src/app/shared/modules/material/material-button.module';
import { MaterialLayoutModule } from 'src/app/shared/modules/material/material-layout.module';
import { MaterialPopupModule } from 'src/app/shared/modules/material/material-popup.module';
import { MaterialNavigationModule } from 'src/app/shared/modules/material/material-navigation.module';
import { MenuModule } from 'src/app/shared/components/menu/menu.module';

const routes: Routes = [
  {
    path: '',
    component: ForumComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialLayoutModule,
    MaterialNavigationModule,
    MaterialButtonModule,
    MaterialFormModule,
    MaterialPopupModule,
    PostCreateModule,
    PostsModule,
    MenuModule
  ],
  declarations: [ForumComponent, UsersComponent]
})
export class ForumModule {}
