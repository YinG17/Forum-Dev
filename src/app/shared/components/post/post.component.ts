import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Post } from '../../services/angular-wordpress-api.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post = <Post>{};

  isEdit = false;

  constructor(public app: AppService) {}

  ngOnInit() {}

  edit() {
    this.app.aws.postRetrieve(this.post.id, 'edit').subscribe(
      res => {
        this.post = res;
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
        console.log(res);
        this.post = res;
      },
      err => this.app.log.handleError(err),
      () => {
        this.isEdit = false;
      }
    );
  }
}
