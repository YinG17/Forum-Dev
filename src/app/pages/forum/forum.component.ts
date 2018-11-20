import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';
import {
  Category,
  User
} from 'src/app/shared/services/angular-wordpress-api.interface';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  categories: Category[];
  users: User[];

  constructor(public app: AppService) {}

  ngOnInit() {
    this.Initialize();
  }

  Initialize() {
    this.app.aws.posts = [];
    this.app.loading = true;

    this.app.aws
      .categoryList()
      .subscribe(cats => {
        this.app.navigateToForum();
        this.app.aws.categories = cats;
      })
      .add(() => {
        this.app.page();
      });

    this.app.aws.userList('?orderby=name').subscribe(users => {
      this.app.aws.users = users;
    });
  }
}
