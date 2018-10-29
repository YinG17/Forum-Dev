import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/auth/auth.module#AuthModule'
  },
  {
    path: 'forum',
    loadChildren: './pages/forum/forum.module#ForumModule'
  },
  {
    path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfileModule'
  },
  {
    path: 'test',
    loadChildren:
      './pages/page-not-found/page-not-found.module#PageNotFoundModule'
  },
  {
    path: 'post',
    loadChildren: './pages/post/post.module#PostModule'
  },
  {
    path: 'post/edit',
    loadChildren: './pages/post/post.module#PostModule'
  },
  {
    path: '**',
    loadChildren:
      './pages/page-not-found/page-not-found.module#PageNotFoundModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
