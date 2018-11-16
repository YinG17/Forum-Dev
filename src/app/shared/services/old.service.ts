/**
 * I created this service for the purpose of putting my unused codes here, maybe for future reference
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OldService {
  constructor() {}

  /**
   * this might be flexible but it lacks on data typing upon HttpEvent process which is non-sense,
   * that's why we use typesccript, to apply data type..
   */

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

  /**
   * this code is recently used for pagination, with the mat paginator
   */

  // page() {
  //   // if previous page size is equal to the current pageSize, the event is page navigation
  //   if (this.previousPageSize === event.pageSize) {
  //     // if the previousPageIndex is lower than the current pageIndex, the event is next page navigation
  //     event.previousPageIndex < event.pageIndex
  //       ? (event.previousPageIndex++, this.app.aws.currentPageIndex++)
  //       : // else the event is previous page navigation
  //         (event.previousPageIndex--, this.app.aws.currentPageIndex--);
  //   } else {
  //     // else if the event is pageSize change, revert currentPageIndex to 1
  //     event.previousPageIndex = 0;
  //     this.app.aws.currentPageIndex = 1;
  //   }

  //   this.previousPageSize = event.pageSize;
  //   event.pageIndex++;

  //   let url = 'per_page=' + event.pageSize + '&page=' + event.pageIndex;

  //   if (this.app.rootUrl === '/profile') {
  //     url += '&author=' + this.app.aws.user.id;
  //   }

  //   this.app.aws.postList(url).subscribe(res => res);
  // }
}
