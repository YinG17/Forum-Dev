import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  PostInterface,
  CategoryInterface,
  categoriesEndpoint,
  postsEndpoint,
  restApiUrl,
  UserResponseInterface,
  UserInterface,
  usersEndpoint,
  customApiUrl,
  profileEndpoint
} from './angular-wordpress-api.interface';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AngularWordpressApiService {
  posts: PostInterface;

  currentCategory = 0;
  currentPageIndex = 1;
  currentTotalPages = 0;
  compose = false;

  post: PostInterface = <any>[];
  user: UserResponseInterface = <any>[];

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
  register(user: UserInterface) {
    return this.http
      .post<UserInterface>(restApiUrl + usersEndpoint, user)
      .pipe(tap(data => this.setLocalData('current_user_info', data)));
  }

  /**
   * @method login - Get user data from wordpress via rest api using raw username and password
   * @param rawUser - user data object (username, password)
   */
  login(rawUser) {
    const option = this.getHttpOptions(rawUser);
    return this.http
      .get<UserResponseInterface>(customApiUrl + profileEndpoint, option)
      .pipe(
        tap(data => {
          console.log(data);
          this.setLocalData('current_user_info', data);
        })
      );
  }

  /**
   * @param id - user id
   */
  userProfile(id) {
    return this.http
      .get<UserResponseInterface>(
        restApiUrl + usersEndpoint + '/' + id,
        this.loginAuth
      )
      .pipe(
        tap(data => {
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
  updateProfile(user: UserInterface) {
    return this.http
      .post(restApiUrl + usersEndpoint + '/me', user, this.loginAuth)
      .pipe(tap(data => this.setLocalData('current_user_info', user)));
  }

  /**
   * @method getUsers - get user list
   * @param filter - filter user by (name, id, ascending or descending)
   */
  userList(filter) {
    return this.http
      .get<UserInterface>(restApiUrl + usersEndpoint + filter)
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
  postGet(id, context?) {
    return this.http
      .get<PostInterface>(restApiUrl + postsEndpoint + id, this.loginAuth)
      .subscribe(data => {
        this.post = data;
      });
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
    console.log(url);
    return this.http
      .get<PostInterface>(url, { observe: 'response' })
      .subscribe(data => {
        this.posts = data.body;
        this.currentTotalPages = +data.headers.get('X-WP-TOTAL');
      });
  }

  /**
   * @method categoryList - retrieves the list of categories
   */
  categoryList() {
    return this.http
      .get<CategoryInterface>(restApiUrl + categoriesEndpoint)
      .pipe(
        tap(data => {
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

  logout(): Promise<boolean> {
    this.removeLocalData('current_user_info');
    return;
  }

  get categories() {
    const cats: CategoryInterface = this.getLocalData('forum_categories');
    return cats;
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
