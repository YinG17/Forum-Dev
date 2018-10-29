import { Component, OnInit } from '@angular/core';
import { AngularWordpressApiPostService } from 'src/app/shared/services/angular-wordpress-api-post.service';
import { AngularWordpressApiUserService } from 'src/app/shared/services/angular-wordpress-api-user.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  constructor(
    public postService: AngularWordpressApiPostService,
    public userService: AngularWordpressApiUserService
  ) {}

  ngOnInit() {
    this.postService.categoryList().subscribe(data => {
      this.postService.categories = data;
    });

    this.userService.getUsers('?orderby=name').subscribe(data => {
      this.userService.users = data;
    });
  }
}
