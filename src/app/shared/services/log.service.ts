import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

const ERROR_LOGIN_EMPTY_PASSWORD = 'empty_password';
const ERROR_LOGIN_INCORRECT_PASSWORD = 'incorrect_password';
const ERROR_LOGIN_INVALID_USERNAME = 'invalid_username';
const ERROR_LOGIN_INVALID_EMAIL = 'invalid_email';

const ERROR_REG_INVALID_PARAM = 'rest_invalid_param';
const ERROR_REG_INVALID_PARAM_EMAIL = 'Invalid parameter(s): email';
const ERROR_REG_INVALID_PARAM_PASSWORD = 'Invalid parameter(s): password';
const ERROR_REG_MISSING_PARAM_USERNAME = 'Missing parameter(s): username';

const ERROR_SEARCH_INVALID_ID = 'rest_user_invalid_id';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor() {}

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
}
