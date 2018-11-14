import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  User,
  Post,
  Comment,
  Category,
  UserResponse,
  categoriesEndpoint,
  commentsEndpoint,
  profileEndpoint,
  postsEndpoint,
  usersEndpoint,
  customApiUrl,
  restApiUrl
} from './angular-wordpress-api.interface';

@Injectable({
  providedIn: 'root'
})
export class AngularWordpressApiService {
  posts: Post;

  currentCategory = 0;
  currentPageIndex = 1;
  currentTotalPages = 0;

  post: Post = <any>[];
  user: UserResponse = <any>[];

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
   * ===================
   * User Related Codes
   * ===================
   */

  /**
   * @method login - Get user data from wordpress via rest api using raw username and password
   * @param rawUser - user data object (username, password)
   */
  login(rawUser: { user_login: string; user_pass: string }) {
    const option = this.getHttpOptions(rawUser);
    return this.http
      .get<UserResponse>(customApiUrl + profileEndpoint, option)
      .pipe(
        tap(data => {
          this.setLocalData('my_info', data);
        })
      );
  }

  /**
   * @method userCreate - Register a new user
   * @param user user data object
   *
   */
  userCreate(user: User) {
    return this.http
      .post<UserResponse>(restApiUrl + usersEndpoint, user)
      .pipe(tap(data => this.setLocalData('my_info', data)));
  }

  /**
   * @method userRetrieve - Retrieves a user data according to the given id
   * @param id - user id
   * @param context - view or edit
   */
  userRetrieve(id: number, context?: string) {
    let url = restApiUrl + usersEndpoint + '/' + id;
    if (context) {
      url += '?context=' + context;
    }
    return this.http.get<UserResponse>(url, this.loginAuth).pipe(
      tap(data => {
        this.user = data;
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
      .post(restApiUrl + usersEndpoint + '/me', user, this.loginAuth)
      .pipe(tap(data => this.setLocalData('my_info', data)));
  }

  /**
   * @method getUsers - get user list
   * @param filter - filter user by (name, id, ascending or descending)
   */
  userList(filter: string) {
    return this.http
      .get<User>(restApiUrl + usersEndpoint + filter)
      .pipe(tap(data => this.setLocalData('forum_users', data)));
  }

  /**
   * ==================
   * POST RELATED CODES
   * ==================
   */

  /**
   * @method postCreate - creates a post
   * @param post - post data object
   */
  postCreate(post: Post) {
    return this.http.post(restApiUrl + postsEndpoint, post, this.loginAuth);
  }

  /**
   * @method getPost - get single post
   *
   * @param id - post id
   * @param context - view or edit
   */
  postRetrieve(id: number, context?: string) {
    let url = restApiUrl + postsEndpoint + '/' + id + '?_embed';
    if (context) {
      url += '&context=' + context;
    }
    return this.http.get<Post>(url, this.loginAuth);
  }

  /**
   * @method postUdate - update a post
   * @param post - Post data object
   */
  postUpdate(post) {
    return this.http.post<Post>(
      restApiUrl + postsEndpoint + '/' + post.id + '?_embed',
      post,
      this.loginAuth
    );
  }

  /**
   * @method postList - retrieve list of post
   * @param filter - list filter argument (author, id, category, and so on..)
   */
  postList(filter?: string) {
    let url = restApiUrl + postsEndpoint + '?';
    if (filter) {
      url += filter;
    }
    url += '&_embed';
    return this.http
      .get<Post>(url, { headers: this.loginAuth.headers, observe: 'response' })
      .pipe(
        tap(data => {
          this.posts = data.body;
          this.currentTotalPages = +data.headers.get('X-WP-TOTAL');
        })
      );
  }

  /**
   * @method commentCreate - creates a new comment
   * @param comment - comment data object
   */
  commentCreate(comment: Comment) {
    return this.http.post(
      restApiUrl + commentsEndpoint,
      comment,
      this.loginAuth
    );
  }

  /**
   * @method commentRetrieve - retrieves a single comment data
   * @param id - comment id to be retrieve
   * @param context - view or edit
   */
  commentRetrieve(id: number, context?: string) {
    let url = restApiUrl + commentsEndpoint + '/' + id + '?_embed';
    if (context) {
      url += '&context=' + context;
    }
    return this.http.get<Comment>(url, this.loginAuth);
  }

  /**
   * @method commentUpdate - Updates an existing comment
   * @param comment - comment data object
   */
  commentUpdate(comment) {
    return this.http.post<Comment>(
      restApiUrl + commentsEndpoint + '/' + comment.id + '?_embed',
      comment,
      this.loginAuth
    );
  }

  /**
   * @method categoryList - retrieves the list of categories then saves the data to local storage
   */
  categoryList() {
    return this.http.get<Category>(restApiUrl + categoriesEndpoint).pipe(
      tap(cats => {
        this.setLocalData('forum_categories', cats);
      })
    );
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
