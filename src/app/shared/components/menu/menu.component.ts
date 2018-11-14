import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Category } from '../../services/angular-wordpress-api.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  categories: Category;

  constructor(public app: AppService) {}

  ngOnInit() {
    this.categories = this.app.aws.categories;
  }

  getData(filter, id?) {
    this.app.aws.currentCategory = id;
    this.app.aws.currentPageIndex = 1;

    let urlParam = '';

    if (this.app.rootUrl === '/profile') {
      urlParam += 'author=' + this.app.aws.user.id;
      if (filter === 'draft') {
        urlParam += '&status=' + filter;
      }
    }

    if (id) {
      urlParam += '&categories=' + id;
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
