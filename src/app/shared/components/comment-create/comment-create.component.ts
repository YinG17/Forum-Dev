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
  comment: Comment = <any>{};

  constructor(public app: AppService) {}

  ngOnInit() {}

  submit(event) {
    this.comment.post = this.post_id;
    if (event.key === 'Enter') {
      this.app.aws.commentCreate(this.comment).subscribe(
        res => res,
        err => this.app.log.handleError(err),
        () => {
          this.app.aws.postList(this.app.filter).subscribe(() => {
            this.comment = <any>{};
          });
        }
      );
    }
  }
}
