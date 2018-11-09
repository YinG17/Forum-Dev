import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  constructor(public appService: AppService) {}

  ngOnInit() {
    this.appService.aws.user = <any>{};

    this.appService.aws.categoryList().subscribe(categories => {
      this.appService.aws.setLocalData('forum_categories', categories);
      this.appService.navigateToForum();
    });

    this.appService.aws.userList('?orderby=name').subscribe(users => {
      this.appService.aws.setLocalData('forum_users', users);
    });
  }
}
