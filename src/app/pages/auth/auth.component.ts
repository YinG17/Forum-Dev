import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from '../../shared/services/angular-wordpress-api.interface';
import { AngularWordpressApiUserService } from 'src/app/shared/services/angular-wordpress-api-user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLogin: boolean;
  userForm: UserInterface = <any>{};

  constructor(
    public userService: AngularWordpressApiUserService,
    public router: Router
  ) {}

  ngOnInit() {
    this.isLogin = true;
  }

  onSubmit() {
    if (this.isLogin) {
      const rawUser = {
        user_login: this.userForm.username,
        user_pass: this.userForm.security_code
      };
      this.userService.profile(rawUser);
    } else {
      this.userService.register(this.userForm).subscribe(data => {
        this.router.navigateByUrl('forum');
      });
    }
  }
}
