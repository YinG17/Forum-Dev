import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../services/app.service';
import {
  Post,
  postsEndpoint
} from '../../services/angular-wordpress-api.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {
  @Input() post = <Post>{};

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
}
