import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  User,
  Post,
  Category,
  categoriesEndpoint,
  commentsEndpoint,
  profileEndpoint,
  postsEndpoint,
  usersEndpoint,
  Comment,
  Media,
  mediaEndpoint
} from './angular-wordpress-api.interface';

@Injectable({
  providedIn: 'root'
})
export class AngularWordpressApiService {
  categories: Category[] = [];
  posts: Post[] = [];
  users: User[] = [];

  currentCategory = null;
  currentPage = 1;

  currentTotalPages = 0;

  post: Post;
  user: User;

  constructor(public router: Router, public http: HttpClient) {}

  /**
   * Returns Http Options
   * @param options options
   * @return any
   *
   * @example
   *  const options = this.getHttpOptions({ user_login: user.username, user_pass: user.password });
   */
  getHttpOptions(options) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization:
          'Basic ' + btoa(`${options.user_login}:${options.user_pass}`),
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
  }

  /**
   * @method login - Get user data from wordpress via rest api using raw username and password
   * @param rawUser - user data object (username, password)
   */
  login(rawUser: { user_login: string; user_pass: string }) {
    const option = this.getHttpOptions(rawUser);
    return this.http.get<User>(profileEndpoint, option).pipe(
      tap(data => {
        this.setLocalData('my_info', data);
      })
    );
  }

  /**
   * @method postList - retrieve list of post
   * @param filter - list filter argument (author, id, category, and so on..)
   */
  postList(filter?: string) {
    let url = postsEndpoint;
    if (filter) {
      url += filter + '&_embed';
    } else {
      url += '?_embed';
    }

    return this.http
      .get<Array<Post>>(url, { headers: this.head, observe: 'response' })
      .pipe(
        tap(data => {
          this.currentTotalPages = +data.headers.get('X-WP-TOTALPAGES');
        })
      );
  }

  /**
   * @method getUsers - get user list
   * @param filter - filter user by (name, id, ascending or descending)
   */
  userList(filter: string) {
    return this.http.get<Array<User>>(usersEndpoint + filter).pipe(
      tap(users => {
        this.setLocalData('forum_users', users);
      })
    );
  }

  /**
   * to prevent error when fetching comments, post, user or anything with an applicable context of 'edit',
   * applied to avoid duplication of codes with similar method.
   */
  get head() {
    let head = <HttpHeaders>{};

    if (this.isLogged) {
      head = this.loginAuth.headers;
    }

    return head;
  }

  /**
   * @method categoryList - retrieves the list of categories then saves the data to local storage
   */
  categoryList() {
    return this.http
      .get<Array<Category>>(categoriesEndpoint)
      .pipe(tap(cats => this.setLocalData('forum_categories', cats)));
  }

  /**
   * ==================
   * FORUM RELATED CODES
   * ==================
   */
  // POST ==============================
  /**
   * @method postCreate - creates a post
   * @param post - post data object
   */
  postCreate(post: Post) {
    return this.http.post(postsEndpoint, post, this.loginAuth);
  }

  /**
   * @method getPost - get single post
   *
   * @param id - post id
   * @param context - view or edit
   */
  postRetrieve(id: number, context?: string) {
    let url = postsEndpoint + '/' + id + '?_embed';
    if (context) {
      url += '&context=' + context;
    }
    return this.http.get<Post>(url, {
      headers: this.head,
      observe: 'response'
    });
  }

  /**
   * @method postUdate - update a post
   * @param post - Post data object
   */
  postUpdate(post) {
    return this.http.post<Post>(
      postsEndpoint + '/' + post.id + '?_embed',
      post,
      this.loginAuth
    );
  }

  // COMMENT ====================================
  /**
   * @method commentCreate - creates a new comment
   * @param comment - comment data object
   */
  commentCreate(comment: Comment) {
    return this.http.post(commentsEndpoint, comment, this.loginAuth);
  }

  /**
   * @method commentRetrieve - retrieves a single comment data
   * @param id - comment id to be retrieve
   * @param context - view or edit
   */
  commentRetrieve(id: number, context?: string) {
    let url = commentsEndpoint + '/' + id + '?_embed';
    if (context) {
      url += '&context=' + context;
    }
    return this.http.get<Comment>(url, {
      headers: this.head,
      observe: 'response'
    });
  }

  /**
   * @method commentUpdate - Updates an existing comment
   * @param comment - comment data object
   */
  commentUpdate(comment: Comment) {
    return this.http.post<Comment>(
      commentsEndpoint + '/' + comment.id + '?_embed',
      comment,
      this.loginAuth
    );
  }

  /**
   * ===================
   * USER RELATED CODES
   * ===================
   */
  /**
   * @method userCreate - Register a new user
   * @param user user data object
   *
   */
  userCreate(user: User) {
    return this.http
      .post<User>(usersEndpoint, user)
      .pipe(tap(data => this.setLocalData('my_info', data)));
  }

  /**
   * @method userRetrieve - Retrieves a user data according to the given id
   * @param id - user id
   * @param context - view or edit
   */
  userRetrieve(id: number, context?: string) {
    let url = usersEndpoint + '/' + id;
    if (context) {
      url += '?context=' + context;
    }

    return this.http
      .get<User>(url, { headers: this.head, observe: 'response' })
      .pipe(
        tap(data => {
          this.user = data.body;
        })
      );
  }

  /**
   * @method userUpdate - Edit and
   * Login user can update only his user data.
   * @param user User update data
   *
   * @note user cannot change 'username'. But everything else is changable.
   */
  userUpdate(user: User) {
    return this.http
      .post(usersEndpoint + '/me', user, this.loginAuth)
      .pipe(tap(data => this.setLocalData('my_info', data)));
  }

  /**
   * ============
   * REST DELETE
   * ============
   */

  /**
   * @desc centralized rest http delete function
   *
   * @param endpoint rest url
   * @param id data id
   * @param force true | false ; when set to true the data will be deleted permanently
   */
  restDelete(endpoint: string, id: number, force?: boolean) {
    let url = endpoint + '/' + id;
    if (force) {
      url += '?force=' + force;
    }
    return this.http.delete<any>(url, this.loginAuth);
  }

  /**
   * ==========================
   * File Upload / Media Posts
   * ==========================
   */

  mediaUpload(media: FormData) {
    // i have to remove this since it rejects the format and returns an error.
    const head = this.loginAuth.headers.delete('Content-Type');

    return this.http.post(mediaEndpoint, media, { headers: head });
  }

  mediaRetrieve(id: number) {
    return this.http.get<Media>(mediaEndpoint, {
      headers: this.head,
      observe: 'response'
    });
  }

  meediaUpdate(media: Media) {
    return this.http.post(mediaEndpoint + '/' + media.id, this.loginAuth);
  }

  /**
   * ==============
   * local storage
   * ==============
   *
   * @param collectionName - string name for the collection
   * @param collection - the collection data
   */

  setLocalData(collectionName: string, collection) {
    localStorage.setItem(collectionName, JSON.stringify(collection));
  }

  getLocalData(collectionName) {
    return JSON.parse(localStorage.getItem(collectionName));
  }

  removeLocalData(collectionName) {
    return localStorage.removeItem(collectionName);
  }

  logout() {
    this.removeLocalData('my_info');
    return;
  }

  get forumCategories() {
    return this.getLocalData('forum_categories');
  }

  get forumUsers() {
    return this.getLocalData('forum_users');
  }

  /**
   * get current user credentials from localstorage
   */
  get loginAuth() {
    const user = {
      user_login: this.myInfo['id'],
      user_pass: this.myInfo['security_code']
    };
    return this.getHttpOptions(user);
  }

  /**
   * Returns user data saved in localStorage.
   */
  get myInfo() {
    return this.getLocalData('my_info');
  }

  /**
   * returns if a user is logged in or not
   */
  get isLogged() {
    return !!this.myInfo;
  }
}
