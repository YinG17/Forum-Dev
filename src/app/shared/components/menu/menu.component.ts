import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import {
  Category,
  postsEndpoint
} from '../../services/angular-wordpress-api.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  categories = <Category>{};

  constructor(public app: AppService) {}

  ngOnInit() {
    this.categories = this.app.aws.forumCategories;
  }

  getData(filter) {
    this.app.aws.currentCategory = filter.id;
    this.app.aws.currentPageIndex = 1;

    let urlParam = this.app.filter;

    if (filter === 'draft') {
      urlParam += '&status=' + filter;
    }

    if (filter.id) {
      urlParam += '&categories=' + filter.id;
    }

    this.app.aws.postList(urlParam).subscribe(
      data => data,
      err => this.app.log.handleError(err),
      () => {
        this.app.navigateToCategory(filter);
      }
    );
  }

  create() {
    this.app.compose = !this.app.compose;
    if (this.app.compose === true) {
      this.app.navigateToPostCreate();
    } else {
      this.app.navigate(this.app.previousUrlAction);
    }
  }
}
