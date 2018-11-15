import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/shared/services/app.service';
import {
  User,
  usersEndpoint
} from '../../services/angular-wordpress-api.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Input() users = <User>{};
  constructor(public app: AppService, public router: Router) {}

  ngOnInit() {}

  profile(id) {
    this.app.aws
      .restRetrieve(usersEndpoint, id)
      .subscribe(data => {
        this.app.aws.user = data;
        this.app.aws.posts = null;
        this.app.navigateToProfile(data.name);
      })
      .add(() => this.app.aws.postList(this.app.filter));
  }
}
