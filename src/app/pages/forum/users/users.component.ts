import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(public appService: AppService, public router: Router) {}

  ngOnInit() {}

  profile(id) {
    this.appService.aws.userProfile(id).subscribe(data => {
      this.appService.aws.posts = null;
      this.appService.navigateToProfile(data.name);
    });
  }
}
