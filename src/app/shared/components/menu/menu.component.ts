import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Category } from '../../services/angular-wordpress-api.interface';

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

  getData(filter, id?) {
    this.app.aws.currentCategory = id;
    this.app.aws.currentPage = 1;
    this.app.loading = true;
    this.app.aws.posts = [];

    const urlParam = this.app.filter;

    if (filter === 'draft') {
      this.app.isDraft = true;
    } else {
      this.app.isDraft = false;
    }

    console.log('Menu component: append filter - ', urlParam);

    this.app.aws.postList(urlParam).subscribe(
      data => data,
      err => this.app.log.handleError(err),
      () => {
        this.app.loading = false;
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
