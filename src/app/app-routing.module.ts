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
    path: 'page-not-found',
    loadChildren:
      './pages/page-not-found/page-not-found.module#PageNotFoundModule'
  },
  {
    path: 'post/:id',
    loadChildren: './shared/components/post/post.module#PostModule'
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
