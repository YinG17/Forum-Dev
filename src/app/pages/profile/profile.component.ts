import { Component, OnInit } from '@angular/core';
import {
  User,
  usersEndpoint
} from 'src/app/shared/services/angular-wordpress-api.interface';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isEdit = false;
  userForm: User;

  constructor(public app: AppService) {}

  ngOnInit() {
    this.doInit();
  }

  doInit() {
    if (!this.app.aws.user.id) {
      this.app.navigateToForum();
    } else {
      this.app.aws
        .postList('author=' + this.app.aws.user.id)
        .subscribe(data => data);
    }
  }

  update() {
    this.app.aws.restUpdate(usersEndpoint, this.userForm).subscribe(res => {
      this.isEdit = !this.isEdit;
    });
  }
}
