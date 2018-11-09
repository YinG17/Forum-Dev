import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public appService: AppService, public router: Router) {}

  getProfile() {
    this.appService.aws
      .userProfile(this.appService.aws.myInfo['id'])
      .subscribe(data => {
        this.appService.aws.user = data;
        this.appService.aws.posts = null;
        this.appService.navigateToProfile(data.name);
      });
  }

  ngOnInit() {}
}
