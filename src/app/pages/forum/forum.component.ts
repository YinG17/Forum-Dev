import { Component, OnInit } from '@angular/core';
import { AngularWordpressApiService } from 'src/app/shared/services/angular-wordpress-api.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  constructor(public awService: AngularWordpressApiService) {}

  ngOnInit() {
    this.awService.user = <any>{};

    this.awService.categoryList().subscribe(data => {
      this.awService.categories = data;
    });

    this.awService.userList('?orderby=name').subscribe(data => {
      this.awService.users = data;
    });
  }
}
