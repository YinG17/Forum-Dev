export interface User {
  password: string;
  username: string;
  email: string;

  roles?: Array<string>;
  nickname?: string;
  name?: string;
  description?: string;
  first_name?: string;
  last_name?: string;
  id?: number;
  meta?: Array<any>;
  slug?: string;
  locale?: string;
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
  content: any; // Required
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
    replies: Array<Comment>;
  };
  _links?: string[];
}

export interface Media extends Post {
  guid: {};
  link: string;
  modified: string;
  modified_gmt: string;
  alt_text: string;
  caption: {};
  description: {};
  media_type: string;
  mime_type: string;
  media_details: {};
  post: number;
  source_url: string;
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

export const imgSrcUrl = '/assets/img/emotes/';

/**
 * @const wordpressUrl - set your development root url here
 */
export const wordpressUrl = 'https://fordev.sonub.com/wp-json';
export const restApiUrl = wordpressUrl + '/wp/v2';
export const customApiUrl = wordpressUrl + '/custom/api';

export const postsEndpoint = restApiUrl + '/posts';
export const usersEndpoint = restApiUrl + '/users';
export const profileEndpoint = customApiUrl + '/profile';
export const commentsEndpoint = restApiUrl + '/comments';
export const categoriesEndpoint = restApiUrl + '/categories';
export const mediaEndpoint = restApiUrl + '/media';

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
