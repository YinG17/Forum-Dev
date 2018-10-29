import { Component, OnInit } from '@angular/core';
import { AngularWordpressApiUserService } from 'src/app/shared/services/angular-wordpress-api-user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(public userService: AngularWordpressApiUserService) {}

  ngOnInit() {}

  profile(id) {
    this.userService.profile(null, '/' + id);
  }
}
