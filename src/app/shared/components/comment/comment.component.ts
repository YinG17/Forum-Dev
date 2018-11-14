import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../services/angular-wordpress-api.interface';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment = <any>{};
  isEdit = false;

  constructor(public app: AppService) {}

  ngOnInit() {}

  edit() {
    this.app.aws.commentRetrieve(this.comment.id, 'edit').subscribe(
      res => {
        this.comment = res;
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
}
