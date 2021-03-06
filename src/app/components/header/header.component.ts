import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public app: AppService, public router: Router) {}

  getProfile() {
    this.app.aws.currentPage = 1;
    this.app.aws.currentCategory = 0;

    this.app.aws
      .userRetrieve(this.app.aws.myInfo['id'])
      .subscribe(data => {
        this.app.aws.user = data.body;
        this.app.aws.posts = [];
      })
      .add(() => {
        this.app.aws.postList('author=' + this.app.aws.user.id);
        this.app.navigateToProfile(this.app.aws.user.name);
      });
  }

  ngOnInit() {}

  logout() {
    this.app.aws.logout();
  }
}
