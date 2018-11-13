import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Comment } from '../../services/angular-wordpress-api.interface';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {
  @Input() post_id: number;
  comment: Comment = <any>{};

  constructor(public app: AppService) {}

  ngOnInit() {}

  submit(event) {
    this.comment.post = this.post_id;
    if (event.key === 'Enter') {
      this.app.aws.commentCreate(this.comment).subscribe(data => {
        console.log(data);
      });
    }
  }
}
