import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForumComponent } from './forum.component';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateModule } from '../../shared/components/post-create/post-create.module';
import { UsersComponent } from './users/users.component';
import { MenuComponent } from './menu/menu.component';
import { PostsModule } from '../../shared/components/posts/posts.module';
import { EmptyModule } from 'src/app/shared/components/empty/empty.module';
import { MaterialFormModule } from 'src/app/shared/modules/material/material-form.module';
import { MaterialButtonModule } from 'src/app/shared/modules/material/material-button.module';

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
    MaterialButtonModule,
    MaterialFormModule,
    PostCreateModule,
    PostsModule,
    EmptyModule
  ],
  declarations: [ForumComponent, UsersComponent, MenuComponent]
})
export class ForumModule {}
