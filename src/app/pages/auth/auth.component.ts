import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../../shared/services/angular-wordpress-api.interface';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLogin: boolean;
  userForm: UserInterface = <any>{};

  constructor(public appService: AppService) {}

  ngOnInit() {
    this.isLogin = true;
  }

  onSubmit() {
    let user;
    if (this.isLogin) {
      user = {
        user_login: this.userForm.username,
        user_pass: this.userForm.password
      };
      this.appService.aws.login(user).subscribe(data => {
        this.appService.navigateToForum();
      });
    } else {
      this.appService.aws.register(this.userForm).subscribe(data => {
        this.appService.navigateToForum();
      });
    }
  }
}
