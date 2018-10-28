import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularWordpressApiUserService } from './shared/services/angular-wordpress-api-user.service';
import { AngularWordpressApiPostService } from './shared/services/angular-wordpress-api-post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'forum-dev';

  constructor(
    public userService: AngularWordpressApiUserService,
    public postService: AngularWordpressApiPostService,
    public router: Router
  ) {}

  ngOnInit() {
    if (this.userService.isLogged) {
      this.router.navigateByUrl('forum');
    } else {
      this.router.navigateByUrl('');
    }
  }
}
