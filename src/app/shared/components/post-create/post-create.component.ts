import { Component, OnInit, Input } from '@angular/core';
import {
  PostInterface,
  CategoryInterface
} from 'src/app/shared/services/angular-wordpress-api.interface';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  @Input() categories: CategoryInterface = <any>[];
  comment_status = false;
  postForm: PostInterface = <any>{};

  constructor(public app: AppService) {}

  ngOnInit() {
    this.formInit();
  }

  /**
   * Initialize the form for use, or reuse
   *
   * it checks for the current path, if the current active path is '/profile', it will set isProfile as true
   * and enabling the use of the postCategory function. or if the current path is not '/profile', it will check
   * if the currentCategory instance of the app.aws holds any value, if it is holding any value, it will be
   * the initial value of the posts' category.
   */
  formInit() {
    this.postForm = <any>{};
    if (this.app.aws.currentCategory === 0) {
      this.postForm.categories = [this.app.aws.currentCategory + 1];
    }
  }

  // this function is only accessible if the current path is '/profile'
  postCategory(id) {
    if (!this.postForm.categories.includes(id)) {
      this.postForm.categories.push(id);
    } else {
      this.postForm.categories = this.postForm.categories.filter(arr => {
        return arr !== id;
      });
    }
  }

  post() {
    let param = 'categories=' + this.app.aws.currentCategory;

    if (!this.app.aws.currentCategory) {
      param = '';
    }

    if (this.app.rootUrl === '/profile') {
      param += '&author=' + this.app.aws.myInfo['id'];
    }

    console.log(this.postForm);
    this.comment_status
      ? (this.postForm.comment_status = 'open')
      : (this.postForm.comment_status = 'closed');
    this.app.aws.postCreate(this.postForm).subscribe(data => {
      console.log(data);
      this.app.aws.postList(param);
      this.formInit();
    });
  }
}
