import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  constructor(public app: AppService) {}

  ngOnInit() {
    this.app.aws.categoryList().subscribe(categories => {
      this.app.aws.setLocalData('forum_categories', categories);
      this.app.navigateToForum();
    });

    this.app.aws.userList('?orderby=name').subscribe(users => {
      this.app.aws.setLocalData('forum_users', users);
    });
  }
}
