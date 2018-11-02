import { Component, OnInit } from '@angular/core';
import { AngularWordpressApiService } from 'src/app/shared/services/angular-wordpress-api.service';
import { UserInterface } from 'src/app/shared/services/angular-wordpress-api.interface';

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
    public awService: AngularWordpressApiService,
    public http: HttpClient
  ) {}

  ngOnInit() {
    // this.awApi.postList().subscribe(data => {
    //   console.log(data);
    // });
  }

  // test get my profile
  function1() {
    const data = this.awService.myInfo;

    console.log(data);
  }

  // test search user

  function2() {}

  function3() {
    // const data = this.awService.myInfo;

    // console.log(data);

    // this.postService.postList();
    this.awService.userProfile('/' + this.awService.myInfo['id']);
  }
}
