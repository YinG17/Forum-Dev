import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';
import { usersEndpoint } from 'src/app/shared/services/angular-wordpress-api.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public app: AppService, public router: Router) {}

  getProfile() {
    this.app.aws
      .restRetrieve(usersEndpoint, this.app.aws.myInfo['id'])
      .subscribe(data => {
        this.app.aws.user = data;
        this.app.aws.posts = null;
      })
      .add(() => {
        this.app.aws.postList('author=' + this.app.aws.user.id);
        this.app.navigateToProfile(this.app.aws.user.name);
      });
  }

  ngOnInit() {}

  logout() {
    this.app.aws.logout();
    this.app.navigateToAuthPage();
  }
}
