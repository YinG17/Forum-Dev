import { Component, OnInit } from '@angular/core';
import { AngularWordpressApiUserService } from 'src/app/shared/services/angular-wordpress-api-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(
    public userService: AngularWordpressApiUserService,
    public router: Router
  ) {}

  ngOnInit() {}

  profile(id) {
    this.userService.userProfile('/' + id).subscribe(data => {
      this.router.navigateByUrl('profile');
    });
  }
}
