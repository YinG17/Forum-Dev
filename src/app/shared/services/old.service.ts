import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OldService {
  constructor() {}

  // this might be flexible but it lacks on data typing upon HttpEvent process which is non-sense
  // that's why we use typesccript, to apply data type..
  //  /**
  //  * =============
  //  * Centralized
  //  * =============
  //  */

  // /**
  //  * @desc centralized rest http post / create funtion
  //  *
  //  * @param endpoint rest url
  //  * @param data data object
  //  */
  // restCreate(endpoint: string, data: any) {
  //   return this.http.post<any>(endpoint, data, this.loginAuth);
  // }

  // /**
  //  * @desc centralized rest http get / retrieve function
  //  *
  //  * @param endpoint rest url
  //  * @param id data id
  //  * @param context view | edit
  //  */
  // restRetrieve(endpoint: string, id: number, context?: string) {
  //   let url = endpoint + '/' + id + '?_embed';
  //   if (context) {
  //     url += '&context=' + context;
  //   }

  //   return this.http.get(url, this.loginAuth);
  // }

  // /**
  //  * @desc centralized rest http post / update function
  //  *
  //  * @param endpoint - rest url
  //  * @param data - data object
  //  */
  // restUpdate(endpoint: string, data: any) {
  //   return this.http.post(
  //     `${endpoint}/${data.id}?_embed`,
  //     data,
  //     this.loginAuth
  //   );
  // }
}
