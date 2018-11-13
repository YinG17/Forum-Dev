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
    if (!this.app.aws.user.id) {
      this.app.navigateToForum();
    }
  }

  update() {
    this.app.aws.updateProfile(this.userForm).subscribe(data => {
      this.isEdit = !this.isEdit;
    });
  }
}
