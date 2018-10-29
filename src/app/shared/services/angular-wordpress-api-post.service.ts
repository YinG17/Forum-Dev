import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  PostInterface,
  CategoryInterface,
  PostResponseInterface,
  categoriesEndpoint,
  postsEndpoint,
  restApiUrl
} from './angular-wordpress-api.interface';
import { AngularWordpressApiUserService } from './angular-wordpress-api-user.service';
import { LogService } from './log.service';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AngularWordpressApiPostService {
  selectedCategory: number;
  categories: CategoryInterface;
  post: PostResponseInterface;
  posts: PostResponseInterface;
  compose = false;

  constructor(
    public authService: AngularWordpressApiUserService,
    public router: Router,
    public http: HttpClient,
    public log: LogService
  ) {}

  /**
   * ==================
   * POST RELATED CODES
   * ==================
   */

  /**
   * @method postCreate - creates a post
   * @param post - post data object
   */
  postCreate(post: PostInterface) {
    return this.http.post<PostInterface>(
      restApiUrl + postsEndpoint,
      post,
      this.authService.loginAuth
    );
  }

  /**
   * @method getPost - get single post
   */
  getPost(id) {
    return this.http
      .get<PostResponseInterface>(restApiUrl + postsEndpoint + id)
      .subscribe(data => {
        this.post = data;
        this.router.navigateByUrl('profile/post/edit');
      });
  }

  /**
   * @method editPost
   */
  editPost(post, id) {
    return this.http.post<PostInterface>(
      restApiUrl + postsEndpoint + id,
      post,
      this.authService.loginAuth
    );
  }

  /**
   * @method postList - retrieve list of post
   * @param filter - used for searching according to the provided request filter if any
   */
  postList(filter?) {
    let url = restApiUrl + postsEndpoint + '?';

    if (filter) {
      url += filter + '&';
    }

    return this.http
      .get<PostResponseInterface>(url + '_embed', { observe: 'response' })
      .subscribe(data => {
        this.posts = data.body;
      });
  }

  categoryList() {
    return this.http
      .get<CategoryInterface>(restApiUrl + categoriesEndpoint)
      .pipe(
        tap(data => {
          this.categories = data;
          this.postList();
        }),
        catchError(this.log.error)
      );
  }
}
