import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularWordpressApiUserService } from 'src/app/shared/services/angular-wordpress-api-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    public userService: AngularWordpressApiUserService,
    public router: Router
  ) {}

  logout() {
    this.userService.logout();
  }

  getProfile() {
    this.userService
      .profile(null, '/' + this.userService.myInfo['id'])
      .subscribe(data => {
        this.userService.user = data;
        this.router.navigateByUrl('profile');
      });
  }

  ngOnInit() {}
}
