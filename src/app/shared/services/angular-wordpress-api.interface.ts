/**
 * legends
 * L - parameters used by LOG
 * P - parameters used by Profile
 * U - parameters used by Update
 * R - parameters used by Register
 * Required parameters are and is used by the
 * indicated Legends
 */

export interface User {
  password: string; // L, P, U, R - Required in L, P, U, R
  username: string; // L, P, U, R - Required in R
  email: string; // L, P, U, R - Required in R

  roles?: Array<string>; // L, P, U, R
  nickname?: string; // L, P, U, R
  name?: string; // L, P, U, R
  description?: string; // P, U, R
  first_name?: string; // P, U, R
  last_name?: string; // P, U, R
}

export interface UserResponse extends User {
  id?: number; // L, P, U - Required in L, P, U, R
  meta?: Array<any>; // P, U
  slug?: string; // U
  posts?: {
    published: Array<any>;
    drafts: Array<any>;
  }; // P
  locale?: string; // U
  avatar_urls: {
    24: string;
    48: string;
    96: string;
  };
  extra_capabilities?: {};
  register_date?: string;
  capabilities?: {};
  _links?: {};
  link?: string;
  url?: string;
}

export interface Category {
  count: number;
  description: string;
  id: number;
  link: string;
  meta: Array<any>;
  name: string;
  parent: number;
  slug: string;
  taxonomy: string;
  _links: Object;
}

export interface Post {
  password?: string;
  author: number; // Required author ID
  title: {
    rendered: string;
    raw: string;
  }; // Required
  categories: number[]; // Required
  content: {
    rendered: string;
    raw: string;
  }; // Required
  id: number; // Required
  date?: string;
  date_gmt?: string;
  slug?: string;
  status?: string;
  excerpt?: Array<any>;
  featured_media?: string;
  comment_status?: string;
  ping_status?: string;
  format?: string;
  meta?: Array<any>;
  sticky?: string;
  template?: string;
  tags?: string[];
  _embedded?: {
    author: {
      name: string;
    };
    replies: Array<any>;
  };
  _links?: string[];
}

export interface Comment {
  id: number;
  author: number;
  author_email: string;
  author_ip: string;
  author_name: string;
  author_url: string;
  author_user_agent: string;
  content: {
    rendered: string;
    raw: string;
  };
  date: string;
  date_gmt: string;
  link: string;
  parent: number;
  post: number;
  status: string;
  type: string;
  author_avatar_urls: {
    24: string;
    48: string;
    96: string;
  };
  meta: Array<any>;
}

/**
 * @const wordpressUrl - set your development root url here
 */
export const wordpressUrl = 'https://fordev.sonub.com/wp-json';
export const restApiUrl = wordpressUrl + '/wp/v2';
export const customApiUrl = wordpressUrl + '/custom/api';

/**
 * common endpoints for both customApiUrl and restApiUrl
 */
export const usersEndpoint = '/users';

/**
 * declare here an endpoint dedicated only for restApiUrl use
 */
export const categoriesEndpoint = '/categories';
export const postsEndpoint = '/posts';
export const commentsEndpoint = '/comments';

/**
 * declare here an endpoint dedicated only for customApiUrl use
 */
export const profileEndpoint = '/profile';

export const ERROR = {
  // auth
  EMPTY_USER: 'empty_username',
  EMPTY_PASS: 'empty_password',
  INVALID_USER: 'invalid_username',

  // register
  MISSING_PARAM: 'rest_missing_callback_param',

  // post
  EMPTY_CONTENT: 'empty_content',

  // comment
  COMMENT_CONTENT_INVALID: 'rest_comment_content_invalid',
  COMMENT_DUPLICATE: 'comment_duplicate'
};
