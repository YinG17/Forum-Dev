import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';
import { AppService } from '../../services/app.service';
import {
  Post,
  postsEndpoint,
  uploadsUrl
} from '../../services/angular-wordpress-api.interface';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {
  @Input() post = <Post>{};

  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  isEdit = false;

  constructor(public app: AppService) {}

  ngOnInit() {}

  edit() {
    this.app.aws.postRetrieve(this.post.id, 'edit').subscribe(
      res => {
        this.post = res.body;
      },
      err => {
        this.app.log.handleError(err);
      },
      () => {
        this.isEdit = true;
      }
    );
  }

  updateInit() {
    if (this.fileUpload.fileToUpload) {
      this.fileUpload.uploadAttachment().add(() => this.update());
    } else {
      this.update();
    }
  }

  update() {
    this.app.aws.postUpdate(this.post).subscribe(
      res => {
        this.post = res;
      },
      err => this.app.log.handleError(err),
      () => {
        this.isEdit = false;
      }
    );
  }

  delete() {
    this.app.aws.restDelete(postsEndpoint, this.post.id, true).subscribe(
      data => {
        this.app.aws.postList(this.app.filter).subscribe(res => {
          this.app.aws.posts = res.body;
        });
      },
      err => this.app.log.handleError(err)
    );
  }

  // on click goto another page and show this
  get realMediaUrl() {
    return `${uploadsUrl}${
      this.post._embedded['wp:featuredmedia'][0].media_details.file
    }`;
  }

  get fileName() {
    if (this.post._embedded['wp:featuredmedia']) {
      return this.post._embedded['wp:featuredmedia'][0].media_details.sizes.full
        .file;
    }

    return;
  }
}
