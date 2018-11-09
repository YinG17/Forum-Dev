import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularWordpressApiService } from 'src/app/shared/services/angular-wordpress-api.service';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  number = 0;

  constructor(
    private http: HttpClient,
    private awService: AngularWordpressApiService,
    private appService: AppService
  ) {}

  ngOnInit() {}

  // postGet() {
  //   return this.http
  //     .get(
  //       'http://localhost/gui/wordpress/wp-json/wp/v2/comments?parent=' +
  //         this.number,
  //       this.awService.loginAuth
  //     )
  //     .subscribe(data => {
  //       console.log(data);
  //     });
  // }

  try() {
    console.log(localStorage);
  }
}
