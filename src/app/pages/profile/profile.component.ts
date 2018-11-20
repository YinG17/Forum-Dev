import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/services/angular-wordpress-api.interface';
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
    this.app.aws.posts = [];
    this.app.loading = true;

    if (!this.app.aws.user.id) {
      this.app.navigateToForum();
    } else {
      this.app.aws.postList(this.app.filter).subscribe(data => {
        this.app.aws.posts = data.body;
        this.app.loading = false;
      });
    }
  }

  update() {
    this.app.aws.userUpdate(this.userForm).subscribe(res => {
      this.isEdit = !this.isEdit;
    });
  }
}
