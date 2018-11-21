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
  status = 'posts';

  constructor(
    public log: LoggerService,
    public aws: AngularWordpressApiService,
    private router: Router
  ) {}

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

  // post navigate
  navigateToPost(id) {
    return this.navigate(`/post/${id}`);
  }
  // post navigate, action = edit|update|delete
  navigateToPostWithAction(id, action) {
    return this.navigate(`/post/${id}#${action}`);
  }

  /**
   * rest url filter
   */
  get filter(): string {
    let urlFilter = '?per_page=30&page=' + this.aws.currentPage;

    if (this.aws.currentCategory) {
      urlFilter += '&categories=' + this.aws.currentCategory;
    }

    if (this.rootUrl === '/profile') {
      urlFilter += '&author=' + this.aws.user.id;

      if (this.status && this.status !== 'posts') {
        urlFilter += '&status=' + this.status;
      }
    }

    return urlFilter;
  }

  /**
   * auto scroll
   */

  page() {
    this.loading = true;
    this.aws.postList(this.filter).subscribe(res => {
      this.aws.posts.push(...res.body);
      this.loading = false;
    });
  }
}
