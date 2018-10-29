import { Component, OnInit } from '@angular/core';
import { AngularWordpressApiUserService } from 'src/app/shared/services/angular-wordpress-api-user.service';
import { UserInterface } from 'src/app/shared/services/angular-wordpress-api.interface';
import { AngularWordpressApiPostService } from 'src/app/shared/services/angular-wordpress-api-post.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  userForm: UserInterface;

  myProfile;
  otherUserId;
  otherProfile;

  constructor(
    public userService: AngularWordpressApiUserService,
    public postService: AngularWordpressApiPostService,
    public http: HttpClient
  ) {}

  ngOnInit() {
    // this.awApi.postList().subscribe(data => {
    //   console.log(data);
    // });
  }

  // test get my profile
  function1() {
    const data = this.userService.myInfo;

    console.log(data);
  }

  // test search user

  function2() {
    this.userService.profile();
  }

  function3() {
    // const data = this.userService.myInfo;

    // console.log(data);

    // this.postService.postList();
    this.userService.profile(null, '?orderby=name');
  }
}
