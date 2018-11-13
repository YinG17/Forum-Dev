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
   * @method register - createUser
   * @param user user data object
   *
   */
  register(user: User) {
    return this.http
      .post<UserResponse>(restApiUrl + usersEndpoint, user)
      .pipe(tap(data => this.setLocalData('current_user_info', data)));
  }

  /**
   * @method login - Get user data from wordpress via rest api using raw username and password
   * @param rawUser - user data object (username, password)
   */
  login(rawUser) {
    const option = this.getHttpOptions(rawUser);
    return this.http
      .get<UserResponse>(customApiUrl + profileEndpoint, option)
      .pipe(
        tap(data => {
          this.setLocalData('current_user_info', data);
        })
      );
  }

  /**
   * @param id - user id
   */
  userProfile(id) {
    return this.http
      .get<UserResponse>(restApiUrl + usersEndpoint + '/' + id, this.loginAuth)
      .pipe(
        tap(data => {
          this.user = data;
          this.postList('author=' + id);
        })
      );
  }

  /**
   * @method updateProfile - updateUser
   * Login user can update only his user data.
   * @param user User update data
   *
   * @note user cannot change 'username'. But everything else is changable.
   */
  updateProfile(user: User) {
    return this.http
      .post(restApiUrl + usersEndpoint + '/me', user, this.loginAuth)
      .pipe(tap(data => this.setLocalData('current_user_info', data)));
  }

  /**
   * @method getUsers - get user list
   * @param filter - filter user by (name, id, ascending or descending)
   */
  userList(filter) {
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
  postCreate(post) {
    return this.http.post(restApiUrl + postsEndpoint, post, this.loginAuth);
  }

  /**
   * @method getPost - get single post
   *
   * @param id - post id
   */
  postGet(id) {
    return this.http.get<Post>(restApiUrl + postsEndpoint + id, this.loginAuth);
  }

  /**
   * @method postUdate - update a post
   */
  postUpdate(post, id) {
    return this.http.post(
      restApiUrl + postsEndpoint + id,
      post,
      this.loginAuth
    );
  }

  /**
   * @method postList - retrieve list of post
   * @param filter - list filter argument (author, id, category, and so on..)
   */
  postList(filter?) {
    let url = restApiUrl + postsEndpoint + '?';
    if (filter) {
      url += filter;
    }
    url += '&_embed';
    return this.http.get<Post>(url, { observe: 'response' }).subscribe(data => {
      this.posts = data.body;
      this.currentTotalPages = +data.headers.get('X-WP-TOTAL');
    });
  }

  commentCreate(comment: Comment) {
    return this.http
      .post(restApiUrl + commentsEndpoint, comment, this.loginAuth)
      .pipe(
        tap(() => {
          this.postList();
        })
      );
  }

  commentUpdate(id, comment) {
    return this.http
      .post(restApiUrl + commentsEndpoint + id, comment, this.loginAuth)
      .pipe(
        tap(() => {
          this.postList();
        })
      );
  }

  /**
   * @method categoryList - retrieves the list of categories
   */
  categoryList() {
    return this.http.get<Category>(restApiUrl + categoriesEndpoint).pipe(
      tap(() => {
        this.postList();
      })
    );
  }

  /**
   * ==============
   * local storage
   * ==============
   *
   * @param collectionName - string name for the collection
   * @param collection - the data to save
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
    this.removeLocalData('current_user_info');
    return;
  }

  get categories() {
    return this.getLocalData('forum_categories');
  }

  get users() {
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
    return this.getLocalData('current_user_info');
  }

  /**
   * returns if a user is logged in or not
   */
  get isLogged() {
    return !!this.myInfo;
  }
}
