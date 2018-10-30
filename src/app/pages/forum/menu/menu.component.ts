import { Component, OnInit } from '@angular/core';
import { AngularWordpressApiService } from 'src/app/shared/services/angular-wordpress-api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(public awService: AngularWordpressApiService) {}

  ngOnInit() {}

  getData(id?) {
    this.awService.currentCategory = id;

    let url = '';

    if (id) {
      url = 'categories=' + id;
    }

    this.awService.postList(url);
  }
}
