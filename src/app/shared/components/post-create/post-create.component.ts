import { Component, OnInit, Input } from '@angular/core';
import {
  Post,
  Category
} from 'src/app/shared/services/angular-wordpress-api.interface';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  @Input() categories: Category = <any>[];
  comment_status = false;
  postForm = <Post>{};

  url: string;
  selectedFile: File;

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

    this.comment_status
      ? (this.postForm.comment_status = 'open')
      : (this.postForm.comment_status = 'closed');

    this.app.aws.postCreate(this.postForm).subscribe(
      res => res,
      err => this.app.log.handleError(err),
      () => {
        this.app.aws.postList(this.app.filter).subscribe(res => {
          console.log(res.body);
          this.app.aws.posts = res.body;
          this.app.navigateToForum().then(() => {
            this.app.compose = false;
          });
        });
      }
    );
  }

  addEmote(e) {
    if (this.postForm.content) {
      this.postForm.content += e;
    } else {
      this.postForm.content = e;
    }
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    this.selectedFile = file;

    const fileToUpload = new FormData();
    // this will be a temporary URL to rendered the currently selected file
    this.url = URL.createObjectURL(file);

    // append the file to fileToUpload FormData
    fileToUpload.append('file', file, file.name);

    // upload the file
    this.app.aws.mediaUpload(fileToUpload).subscribe(
      // assign the file id to the post's featured_media field
      data => {
        // re assign url to the response url
        if (this.postForm.content) {
          this.postForm.content += this._image(data['source_url']);
        } else {
          this.postForm.content = this._image(data['source_url']);
        }
        this.url = data['source_url'];
        this.postForm.featured_media = data['id'];
      },
      err => this.app.log.handleError(err)
    );

    console.log(this.postForm);
  }

  _image(param) {
    return '<span><img height="500px" src="' + param + '"/></span>';
  }
}
