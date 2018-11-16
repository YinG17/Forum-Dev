import { AngularWordpressApiService } from './angular-wordpress-api.service';
import { LoggerService } from './logger.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  compose = false;
  loading = false;
  isDraft = false;

  constructor(
    public log: LoggerService,
    public aws: AngularWordpressApiService,
    private router: Router
  ) {}

  get nop() {
    return window;
  }

  getPrevious(param: string) {
    return this.currentUrlLocation.substring(
      0,
      this.router.url.lastIndexOf(param)
    );
  }

  get hostDomain() {
    return location.origin;
  }

  get rootUrl() {
    return this.currentUrlLocation.split('/', 2).join('/');
  }

  get currentUrlLocation() {
    return location.pathname;
  }

  get previousUrlAction() {
    return this.getPrevious('#');
  }

  get previousUrlLocation() {
    return this.getPrevious('/');
  }

  navigate(url) {
    return this.router.navigateByUrl(url);
  }

  navigateToAuthPage() {
    return this.navigate(``);
  }

  // navigate to forum with default category 'posts'
  navigateToForum() {
    return this.navigate(`/forum/posts`);
  }

  // change url to current selected category
  navigateToCategory(category) {
    return this.navigate(`/${this.previousUrlLocation}/${category}`);
  }

  // navigate to profile with default category value as 'posts'
  navigateToProfile(name) {
    return this.navigate(`/profile/${name}/posts`);
  }
  // navigate to profile, action = edit|update|delete
  navigateToProfileWithAction(id, action) {
    return this.navigate(`/profile/${id}#${action}`);
  }

  // post navigate
  navigateToPost(id) {
    return this.navigate(`/post/${id}`);
  }
  // post navigate, action = edit|update|delete
  navigateToPostWithAction(id, action) {
    return this.navigate(`/post/${id}#${action}`);
  }
  // change url when creating a post, append '#post_create'
  navigateToPostCreate() {
    return this.navigate(`/${this.currentUrlLocation}#post_create`);
  }

  /**
   * rest url filter
   */
  get filter(): string {
    let urlFilter = '';

    if (this.aws.currentCategory !== 0) {
      urlFilter += '?categories=' + this.aws.currentCategory;
    }

    if (this.rootUrl === '/profile') {
      if (urlFilter !== '') {
        urlFilter += '&author=' + this.aws.user.id;
      } else {
        urlFilter = '?author=' + this.aws.user.id;
      }

      if (this.isDraft) {
        urlFilter += '&status=draft';
      }
    }

    return urlFilter;
  }

  /**
   * auto scroll
   */

  page(pageIndex) {
    let url = '';
    this.loading = true;
    if (this.filter !== '') {
      url = this.filter + '&per_page=10&page=' + pageIndex;
    } else {
      url = '?per_page=10&page=' + pageIndex;
    }

    this.aws.postList(url).subscribe(res => {
      console.log(res);
      this.aws.currentPage++;
      this.loading = false;
    });
  }
}
