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

  submit() {
    this.app.aws.postUpdate(this.post, '/' + this.post.id).subscribe(data => {
      console.log(data);
      this.app.navigateToForum();
    });
  }
}
