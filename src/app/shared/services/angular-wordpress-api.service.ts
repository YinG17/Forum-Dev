import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  PostInterface,
  CategoryInterface,
  PostResponseInterface,
  categoriesEndpoint,
  postsEndpoint,
  restApiUrl,
  UserResponseInterface,
  UserInterface,
  usersEndpoint,
  customApiUrl,
  profileEndpoint
} from './angular-wordpress-api.interface';
import { LogService } from './log.service';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AngularWordpressApiService {
  categories: CategoryInterface;
  currentCategory: number;
  post: PostResponseInterface;
  posts: PostResponseInterface;
  compose = false;

  user: UserResponseInterface;
  users: UserResponseInterface;

  constructor(
    public router: Router,
    public http: HttpClient,
    public log: LogService
  ) {}

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
      this.loginAuth
    );
  }

  /**
   * @method getPost - get single post
   */
  postGet(id, path) {
    return this.http
      .get<PostResponseInterface>(
        restApiUrl + postsEndpoint + id,
        this.loginAuth
      )
      .subscribe(data => {
        this.post = data;
        this.router.navigateByUrl(path);
      });
  }

  /**
   * @method editPost
   */
  postUpdate(post, id) {
    return this.http
      .post<PostInterface>(
        restApiUrl + postsEndpoint + id,
        post,
        this.loginAuth
      )
      .pipe(
        tap(data => {
          this.postGet(id, 'post');
        })
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
        console.log(data);
        this.posts = data.body;
      });
  }

  categoryList() {
    return this.http
      .get<CategoryInterface>(restApiUrl + categoriesEndpoint, this.loginAuth)
      .pipe(
        tap(data => {
          this.categories = data;
          this.postList();
        })
      );
  }

  /**
   * ===================
   * User Related Codes
   * ===================
   *
   *   /**
   * @method register - createUser
   * @param user user object
   *
   */
  register(user: UserInterface) {
    return this.http.post<UserInterface>(restApiUrl + usersEndpoint, user).pipe(
      tap(data => this.saveUserData(data)),
      catchError(this.log.error)
    );
  }

  /**
   * @method login - Get user data from wordpress via rest api
   * @param user - User update data
   * @arg - rawUser - supplied when logging in an existing account
   */
  login(rawUser) {
    const option = this.getHttpOptions(rawUser);
    return this.http
      .get<UserResponseInterface>(customApiUrl + profileEndpoint, option)
      .pipe(
        tap(data => {
          this.saveUserData(data);
        })
      );
  }

  userProfile(id) {
    return this.http
      .get<UserResponseInterface>(
        restApiUrl + usersEndpoint + id,
        this.loginAuth
      )
      .pipe(
        tap(data => {
          this.user = data;
          this.postList('author=' + id);
        })
      );
  }

  /**
   * @method getUsers - get user list
   * @param param - filter
   */
  userList(param) {
    return this.http.get<UserInterface>(restApiUrl + usersEndpoint + param);
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
      .post<UserInterface>(
        restApiUrl + usersEndpoint + '/me',
        user,
        this.loginAuth
      )
      .pipe(
        tap(data => this.saveUserData(data)),
        catchError(this.log.error)
      );
  }

  logout() {
    return (
      localStorage.removeItem('current_user_info'),
      this.router.navigateByUrl('')
    );
  }

  /**
   * @method saveUserData - save user data to local storage after registration
   * @param user - user data object
   */
  private saveUserData(user: UserInterface) {
    localStorage.setItem('current_user_info', JSON.stringify(user));
  }

  /**
   * Returns user data saved in localStorage.
   */
  get myInfo() {
    return JSON.parse(localStorage.getItem('current_user_info'));
  }

  /**
   * returns if a user is logged in or not
   */
  get isLogged() {
    return !!this.myInfo;
  }

  /**
   * @method GetLogAuth - get current user credentials from localstorage
   */
  get loginAuth() {
    const user = {
      user_login: this.myInfo['id'],
      user_pass: this.myInfo['security_code']
    };

    return this.getHttpOptions(user);
  }
}
