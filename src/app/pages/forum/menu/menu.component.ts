import { Component, OnInit } from '@angular/core';
import { AngularWordpressApiPostService } from 'src/app/shared/services/angular-wordpress-api-post.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(public postService: AngularWordpressApiPostService) {}

  ngOnInit() {}

  getData() {
    let url = 'categories=' + this.postService.selectedCategory;

    if (!this.postService.selectedCategory) {
      url = '';
    }

    this.postService.postList(url);
  }
}
