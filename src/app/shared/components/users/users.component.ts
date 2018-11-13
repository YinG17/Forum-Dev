import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Input() users = <any>{};
  constructor(public app: AppService, public router: Router) {}

  ngOnInit() {}

  profile(id) {
    this.app.aws.userProfile(id).subscribe(data => {
      this.app.aws.posts = null;
      this.app.navigateToProfile(data.name);
    });
  }
}
