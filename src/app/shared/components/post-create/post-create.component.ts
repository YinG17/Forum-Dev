import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  Post,
  Category
} from 'src/app/shared/services/angular-wordpress-api.interface';
import { AppService } from '../../services/app.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  @Input() categories: Category = <any>[];
  comment_status = false;
  postForm = <Post>{};

  popUpOpen = false;
  enable: boolean;

  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

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
    this.fileUpload.attachmentInit();
    this.enable = true;
    this.postForm = <Post>{};
    this.postForm.categories = [this.app.aws.currentCategory + 1];
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
    if (this.postForm.status === undefined) {
      return this.app.log.message('Please Select Post Type');
    }

    this.enable = false;

    this.comment_status
      ? (this.postForm.comment_status = 'open')
      : (this.postForm.comment_status = 'closed');

    if (this.fileUpload.fileToUpload) {
      this.fileUpload.uploadAttachment().add(() => {
        this.uploadPost();
      });
    } else {
      this.uploadPost();
    }
  }

  uploadPost() {
    this.app.aws.postCreate(this.postForm).subscribe(
      res => res,
      err => this.app.log.handleError(err),
      () => {
        this.app.aws.postList(this.app.filter).subscribe(res => {
          console.log(res.body);
          this.app.aws.posts = res.body;
          this.app.navigateToForum().then(() => {
            this.app.compose = false;
            this.formInit();
          });
        });
      }
    );
  }

  inject(e) {
    if (this.postForm.content) {
      this.postForm.content += e;
    } else {
      this.postForm.content = e;
    }
  }
}
