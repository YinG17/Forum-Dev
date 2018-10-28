import { Component, OnInit } from '@angular/core';
import { AngularWordpressApiUserService } from 'src/app/shared/services/angular-wordpress-api-user.service';
import { UserInterface } from 'src/app/shared/services/angular-wordpress-api.interface';
import { AngularWordpressApiPostService } from 'src/app/shared/services/angular-wordpress-api-post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isEdit = false;
  userForm: UserInterface;

  constructor(
    public userService: AngularWordpressApiUserService,
    public postService: AngularWordpressApiPostService
  ) {}

  ngOnInit() {}

  update() {
    this.userService.updateProfile(this.userForm).subscribe(data => {
      this.isEdit = !this.isEdit;
      console.log(data);
    });
  }
}
