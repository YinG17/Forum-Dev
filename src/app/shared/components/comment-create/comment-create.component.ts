import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../services/angular-wordpress-api.interface';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit {
  @Input() post_id: number;
  comment = <Comment>{};

  constructor(public app: AppService) {}

  ngOnInit() {}

  submit() {
    this.comment.post = this.post_id;
    this.app.aws.commentCreate(this.comment).subscribe(
      res => res,
      err => this.app.log.handleError(err),
      () => {
        this.app.aws.postList(this.app.filter).subscribe(data => {
          this.app.aws.posts = data.body;
          this.comment = <any>{};
        });
      }
    );
  }

  inject(e) {
    if (this.comment.content) {
      this.comment.content += e;
    } else {
      this.comment.content = e;
    }
  }
}
