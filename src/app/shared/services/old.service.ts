import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OldService {
  constructor() {}

  /**
   * ==================
   * POST RELATED CODES
   * ==================
   */
  // POST ===========================================
  // /**
  //  * @method postCreate - creates a post
  //  * @param post - post data object
  //  */
  // postCreate(post: Post) {
  //   return this.http.post(postsEndpoint, post, this.loginAuth);
  // }

  // /**
  //  * @method getPost - get single post
  //  *
  //  * @param id - post id
  //  * @param context - view or edit
  //  */
  // postRetrieve(id: number, context?: string) {
  //   let url = postsEndpoint + '/' + id + '?_embed';
  //   if (context) {
  //     url += '&context=' + context;
  //   }
  //   return this.http.get<Post>(url, this.loginAuth);
  // }

  // /**
  //  * @method postUdate - update a post
  //  * @param post - Post data object
  //  */
  // postUpdate(post) {
  //   return this.http.post<Post>(
  //     postsEndpoint + '/' + post.id + '?_embed',
  //     post,
  //     this.loginAuth
  //   );
  // }

  // COMMENT ========================================
  // /**
  //  * @method commentCreate - creates a new comment
  //  * @param comment - comment data object
  //  */
  // commentCreate(comment: Comment) {
  //   return this.http.post(commentsEndpoint, comment, this.loginAuth);
  // }

  // /**
  //  * @method commentRetrieve - retrieves a single comment data
  //  * @param id - comment id to be retrieve
  //  * @param context - view or edit
  //  */
  // commentRetrieve(id: number, context?: string) {
  //   let url = commentsEndpoint + '/' + id + '?_embed';
  //   if (context) {
  //     url += '&context=' + context;
  //   }
  //   return this.http.get<Comment>(url, this.loginAuth);
  // }

  // /**
  //  * @method commentUpdate - Updates an existing comment
  //  * @param comment - comment data object
  //  */
  // commentUpdate(comment) {
  //   return this.http.post<Comment>(
  //     commentsEndpoint + '/' + comment.id + '?_embed',
  //     comment,
  //     this.loginAuth
  //   );
  // }

  /**
   * ===================
   * USER RELATED CODES
   * ===================
   */
  // /**
  //  * @method userCreate - Register a new user
  //  * @param user user data object
  //  *
  //  */
  // userCreate(user: User) {
  //   return this.http
  //     .post<UserResponse>(usersEndpoint, user)
  //     .pipe(tap(data => this.setLocalData('my_info', data)));
  // }

  // /**
  //  * @method userRetrieve - Retrieves a user data according to the given id
  //  * @param id - user id
  //  * @param context - view or edit
  //  */
  // userRetrieve(id: number, context?: string) {
  //   let url = usersEndpoint + '/' + id;
  //   if (context) {
  //     url += '?context=' + context;
  //   }
  //   return this.http.get<UserResponse>(url, this.loginAuth).pipe(
  //     tap(data => {
  //       this.user = data;
  //     })
  //   );
  // }

  // /**
  //  * @method userUpdate - Edit and
  //  * Login user can update only his user data.
  //  * @param user User update data
  //  *
  //  * @note user cannot change 'username'. But everything else is changable.
  //  */
  // userUpdate(user: User) {
  //   return this.http
  //     .post(usersEndpoint + '/me', user, this.loginAuth)
  //     .pipe(tap(data => this.setLocalData('my_info', data)));
  // }
}
