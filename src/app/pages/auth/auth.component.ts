import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/services/angular-wordpress-api.interface';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLogin: boolean;
  userForm = <User>{};

  constructor(public app: AppService) {}

  ngOnInit() {
    this.isLogin = true;

    if (this.app.aws.isLogged) {
      this.app.navigateToForum();
    }
  }

  onSubmit() {
    let user;
    if (this.isLogin) {
      user = {
        user_login: this.userForm.username,
        user_pass: this.userForm.password
      };
      this.app.aws.login(user).subscribe(
        res => console.log(res),
        err => {
          this.app.log.handleError(err);
        },
        () => {
          this.app.navigateToForum();
        }
      );
    } else {
      this.app.aws.userCreate(this.userForm).subscribe(
        res => console.log(res),

        err => {
          this.app.log.handleError(err);
        },
        () => {
          this.app.navigateToForum();
        }
      );
    }
  }
}
