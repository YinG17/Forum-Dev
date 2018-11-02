/**
 * legends
 * L - parameters used by Login
 * P - parameters used by Profile
 * U - parameters used by Update
 * R - parameters used by Register
 * Required parameters are and is used by the
 * indicated Legends
 */

export interface UserInterface {
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

export interface UserResponseInterface extends UserInterface {
  id?: number; // L, P, U - Required in L, P, U, R
  meta?: Array<any>; // P, U
  slug?: string; // U
  posts?: {
    published: Array<any>;
    drafts: Array<any>;
  }; // P
  locale?: string; // U
  avatar_urls?: {}; // P
  extra_capabilities?: {};
  register_date?: string;
  capabilities?: {};
  _links?: {};
  link?: string;
  url?: string;
}

export interface CategoryInterface {
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

export interface PostInterface {
  password?: string;
  author: number; // Required author ID
  title: string; // Required
  categories: number[]; // Required
  content: string; // Required
  id: number; // Required
  date?: string;
  date_gmt?: string;
  slug?: string;
  status?: string;
  excerpt?: Array<any>;
  featured_media?: string;
  comment_status?: boolean;
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
  };
  _links?: string[];
}

/**
 * @const wordpressUrl - set your development root url here
 */
export const wordpressUrl = 'http://localhost/gui/wordpress/wp-json';
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

/**
 * declare here an endpoint dedicated only for customApiUrl use
 */
export const profileEndpoint = '/profile';

const ERROR_LOGIN_EMPTY_PASSWORD = 'empty_password';
const ERROR_LOGIN_INCORRECT_PASSWORD = 'incorrect_password';
const ERROR_LOGIN_INVALID_USERNAME = 'invalid_username';
const ERROR_LOGIN_INVALID_EMAIL = 'invalid_email';

const ERROR_REG_INVALID_PARAM = 'rest_invalid_param';
const ERROR_REG_INVALID_PARAM_EMAIL = 'Invalid parameter(s): email';
const ERROR_REG_INVALID_PARAM_PASSWORD = 'Invalid parameter(s): password';
const ERROR_REG_MISSING_PARAM_USERNAME = 'Missing parameter(s): username';

const ERROR_SEARCH_INVALID_ID = 'rest_user_invalid_id';
