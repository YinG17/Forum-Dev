import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularWordpressApiService } from 'src/app/shared/services/angular-wordpress-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    public awService: AngularWordpressApiService,
    public router: Router
  ) {}

  getProfile() {
    this.awService
      .userProfile('/' + this.awService.myInfo['id'])
      .subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('profile');
      });
  }

  ngOnInit() {}
}
