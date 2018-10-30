import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from '../../shared/services/angular-wordpress-api.interface';
import { AngularWordpressApiService } from 'src/app/shared/services/angular-wordpress-api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLogin: boolean;
  userForm: UserInterface = <any>{};

  constructor(
    public awService: AngularWordpressApiService,
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
      this.awService.login(rawUser).subscribe(data => {
        this.router.navigateByUrl('forum');
      });
    } else {
      this.awService.register(this.userForm).subscribe(data => {
        this.router.navigateByUrl('forum');
      });
    }
  }
}
