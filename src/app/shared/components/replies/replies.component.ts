import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../services/angular-wordpress-api.interface';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.scss']
})
export class RepliesComponent implements OnInit {
  @Input() reply: Comment = <any>[];

  isEdit = false;

  constructor(public app: AppService) {}

  ngOnInit() {}

  updateComment() {
    console.log(this.reply);
    this.app.aws
      .commentUpdate('/' + this.reply.id, this.reply)
      .subscribe(data => {
        console.log(data);
        this.isEdit = false;
      });
  }
}
