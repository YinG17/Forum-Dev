import { Component, OnInit } from '@angular/core';
import { AngularWordpressApiService } from '../../services/angular-wordpress-api.service';
import { PostInterface } from '../../services/angular-wordpress-api.interface';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  comment_status = false;
  postForm: PostInterface = <any>{};

  constructor(public awService: AngularWordpressApiService) {}

  ngOnInit() {
    this.formInit();
  }

  /**
   * Initialize the form for use, or reuse
   *
   * it checks for the current path, if the current active path is '/profile', it will set isProfile as true
   * and enabling the use of the postCategory function. or if the current path is not '/profile', it will check
   * if the currentCategory instance of the awService holds any value, if it is holding any value, it will be
   * the initial value of the posts' category.
   */
  formInit() {
    this.postForm = <any>{};
    this.postForm.categories = [];

    if (this.awService.currentCategory) {
      this.postForm.categories.push(this.awService.currentCategory);
    }
  }

  // this function is only accessible if the current path is '/profile'
  postCategory(id) {
    if (!this.postForm.categories.includes(id)) {
      this.postForm.categories.push(id);
      console.log(`category added`, this.postForm.categories);
    } else {
      this.postForm.categories = this.postForm.categories.filter(arr => {
        return arr !== id;
      });
      console.log(`category removed`, this.postForm.categories);
    }
  }

  post() {
    this.comment_status
      ? (this.postForm.comment_status = 'open')
      : (this.postForm.comment_status = 'closed');
    const res = this.awService.postCreate(this.postForm);
    if (res) {
      this.formInit();
    }
  }
}
