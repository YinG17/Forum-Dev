import { Component, OnInit } from '@angular/core';
import { AngularWordpressApiService } from 'src/app/shared/services/angular-wordpress-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(
    public awService: AngularWordpressApiService,
    public router: Router
  ) {}

  ngOnInit() {}

  profile(id) {
    this.awService.userProfile(id).subscribe(data => {
      this.awService.posts = null;
      this.router.navigateByUrl('profile');
    });
  }
}
