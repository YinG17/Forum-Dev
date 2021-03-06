import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import {
  Comment,
  commentsEndpoint
} from '../../services/angular-wordpress-api.interface';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommentComponent implements OnInit {
  @Input() comment = <Comment>{};
  isEdit = false;

  constructor(public app: AppService) {}

  ngOnInit() {}

  edit() {
    this.app.aws.commentRetrieve(this.comment.id, 'edit').subscribe(
      res => {
        this.comment = res.body;
      },
      err => this.app.log.handleError(err),
      () => {
        this.isEdit = true;
      }
    );
  }

  update() {
    this.app.aws.commentUpdate(this.comment).subscribe(
      res => {
        this.comment = res;
      },
      err => this.app.log.handleError(err),
      () => {
        this.isEdit = false;
      }
    );
  }

  delete() {
    this.app.aws.restDelete(commentsEndpoint, this.comment.id).subscribe(
      data => {
        console.log(data);
        this.app.aws.postList(this.app.filter).subscribe(res => {
          this.app.aws.posts = res.body;
        });
      },
      err => this.app.log.handleError(err)
    );
  }

  inject(e) {
    if (this.comment.content.raw) {
      this.comment.content.raw += e;
    } else {
      this.comment.content.raw = e;
    }
  }
}
