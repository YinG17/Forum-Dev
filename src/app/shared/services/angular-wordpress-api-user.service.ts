import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { LogService } from './log.service';

import {
  restApiUrl,
  customApiUrl,
  usersEndpoint,
  profileEndpoint,
  UserInterface,
  UserResponseInterface
} from './angular-wordpress-api.interface';
import { AngularWordpressApiHttpHeaderService } from './angular-wordpress-api-http-header.service';

@Injectable({
  providedIn: 'root'
})
export class AngularWordpressApiUserService {
  user: UserResponseInterface;
  users: UserResponseInterface;

  constructor(
    public logService: LogService,
    public router: Router,
    private http: HttpClient,
    private httpOption: AngularWordpressApiHttpHeaderService
  ) {}

  /**
   * @method register - createUser
   * @param user user object
   *
   */
  register(user: UserInterface) {
    return this.http.post<UserInterface>(restApiUrl + usersEndpoint, user).pipe(
      tap(data => this.saveUserData(data)),
      catchError(this.logService.error)
    );
  }

  /**
   * @method login - Get user data from wordpress via rest api
   * @param user - User update data
   * @arg - rawUser - supplied when logging in an existing account
   */
  profile(rawUser?, id?) {
    if (rawUser) {
      const option = this.httpOption.getHttpOptions(rawUser);
      return this.http
        .get<UserResponseInterface>(customApiUrl + profileEndpoint, option)
        .pipe(
          tap(data => {
            this.saveUserData(data);
          }),
          catchError(this.logService.error)
        );
    } else {
      let url = restApiUrl;

      if (id === Number) {
        url = customApiUrl;
      }

      return this.http
        .get<UserResponseInterface>(url + usersEndpoint + id, this.loginAuth)
        .subscribe(data => {
          console.log(data);
        });
    }
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
        catchError(this.logService.error)
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

    return this.httpOption.getHttpOptions(user);
  }
}
