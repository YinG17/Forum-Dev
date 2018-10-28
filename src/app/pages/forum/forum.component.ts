import { Component, OnInit } from '@angular/core';
import { AngularWordpressApiPostService } from 'src/app/shared/services/angular-wordpress-api-post.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  constructor(public postService: AngularWordpressApiPostService) {}

  ngOnInit() {
    this.postService.categoryList().subscribe(data => {
      this.postService.categories = data;
    });
  }

  getData() {
    let url = 'categories=' + this.postService.selectedCategory;

    if (!this.postService.selectedCategory) {
      url = '';
    }

    this.postService.postList(url);
  }
}
