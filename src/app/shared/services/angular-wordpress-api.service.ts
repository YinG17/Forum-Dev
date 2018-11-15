import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  User,
  Post,
  Category,
  UserResponse,
  categoriesEndpoint,
  profileEndpoint,
  postsEndpoint,
  usersEndpoint
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
   * @method login - Get user data from wordpress via rest api using raw username and password
   * @param rawUser - user data object (username, password)
   */
  login(rawUser: { user_login: string; user_pass: string }) {
    const option = this.getHttpOptions(rawUser);
    return this.http.get<UserResponse>(profileEndpoint, option).pipe(
      tap(data => {
        this.setLocalData('my_info', data);
      })
    );
  }

  /**
   * @method getUsers - get user list
   * @param filter - filter user by (name, id, ascending or descending)
   */
  userList(filter: string) {
    return this.http
      .get<User>(usersEndpoint + filter)
      .pipe(tap(data => this.setLocalData('forum_users', data)));
  }

  /**
   * @method postList - retrieve list of post
   * @param filter - list filter argument (author, id, category, and so on..)
   */
  postList(filter?: string) {
    let url = postsEndpoint + '?';
    if (filter) {
      url += filter;
    }
    url += '&_embed';
    return this.http.get<Post>(url, { observe: 'response' }).pipe(
      tap(data => {
        this.posts = data.body;
        this.currentTotalPages = +data.headers.get('X-WP-TOTAL');
      })
    );
  }

  /**
   * @method categoryList - retrieves the list of categories then saves the data to local storage
   */
  categoryList() {
    return this.http.get<Category>(categoriesEndpoint).pipe(
      tap(cats => {
        this.setLocalData('forum_categories', cats);
      })
    );
  }

  /**
   * =============
   * Centralized
   * =============
   */

  /**
   * @desc centralized rest http post / create funtion
   *
   * @param endpoint rest url
   * @param data data object
   */
  restCreate(endpoint: string, data: any) {
    return this.http.post<any>(endpoint, data, this.loginAuth);
  }

  /**
   * @desc centralized rest http get / retrieve function
   *
   * @param endpoint rest url
   * @param id data id
   * @param context view | edit
   */
  restRetrieve(endpoint: string, id: number, context?: string) {
    let url = endpoint + '/' + id + '?_embed';
    if (context) {
      url += '&context=' + context;
    }

    return this.http.get<any>(url, this.loginAuth);
  }

  /**
   * @desc centralized rest http post / update function
   *
   * @param endpoint - rest url
   * @param data - data object
   */
  restUpdate(endpoint: string, data: any) {
    return this.http.post<any>(
      endpoint + `/${data.id}?_embed`,
      data,
      this.loginAuth
    );
  }

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
