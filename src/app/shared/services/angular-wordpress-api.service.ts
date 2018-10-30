import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
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
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngularWordpressApiService {
  users: UserResponseInterface;
  posts: PostInterface;
  categories: CategoryInterface;

  currentCategory: number;
  compose = false;

  post: PostInterface;
  user: UserResponseInterface;

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
   * ==================
   * POST RELATED CODES
   * ==================
   */

  /**
   * @method postCreate - creates a post
   * @param post - post data object
   */
  postCreate(post: PostInterface) {
    let param = 'categories=' + this.currentCategory;

    if (!this.currentCategory) {
      param = '';
    }

    if (this.router.url === '/profile') {
      param += '&author=' + this.myInfo['id'];
    }

    return this.http
      .post(restApiUrl + postsEndpoint, post, this.loginAuth)
      .subscribe(data => {
        this.postList(param);
      });
  }

  /**
   * @method getPost - get single post
   *
   * @param id - post id
   */
  postGet(id) {
    return this.http
      .get<PostInterface>(restApiUrl + postsEndpoint + id, this.loginAuth)
      .subscribe(data => {
        this.post = data;
      });
  }

  /**
   * @method postUdate - update a post
   */
  postUpdate(post: PostInterface, id) {
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
      url += filter + '&';
    }

    return this.http
      .get<PostInterface>(url + '_embed', { observe: 'response' })
      .subscribe(data => {
        this.posts = data.body;
      });
  }

  /**
   * @method categoryList - retrieves the list of categories
   */
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
   */

  /**
   * @method register - createUser
   * @param user user data object (username, password)
   *
   */
  register(user: UserInterface) {
    return this.http
      .post(restApiUrl + usersEndpoint, user)
      .pipe(tap(data => this.saveUserData(<UserInterface>data)));
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
          this.saveUserData(data);
        })
      );
  }

  /**
   * @param id - user id
   */
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
   * @method updateProfile - updateUser
   * Login user can update only his user data.
   * @param user User update data
   *
   * @note user cannot change 'username'. But everything else is changable.
   */
  updateProfile(user: UserInterface) {
    return this.http
      .post(restApiUrl + usersEndpoint + '/me', user, this.loginAuth)
      .pipe(
        tap(data => this.saveUserData(<UserInterface>data)),
        catchError(this.error)
      );
  }

  /**
   * @method getUsers - get user list
   * @param filter - filter user by (name, id, ascending or descending)
   */
  userList(filter) {
    return this.http.get<UserInterface>(restApiUrl + usersEndpoint + filter);
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
   * ===============
   * Error handling
   * ===============
   */

  error(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error);
    } else {
      // backend returned an unsuccessful response code.
      console.error('An error occurred:', error.error.code);
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${error.error.message}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  // showme() {
  //   console.log(this.router.url);
  // }
}
