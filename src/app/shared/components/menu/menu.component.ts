import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { CategoryInterface } from '../../services/angular-wordpress-api.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  categories: CategoryInterface;

  constructor(public app: AppService) {}

  ngOnInit() {
    this.categories = this.app.aws.categories;
  }

  getData(category, id?) {
    this.app.aws.currentCategory = id;
    this.app.aws.currentPageIndex = 1;

    let urlParam = '';

    if (this.app.rootUrl === '/profile') {
      urlParam += 'author=' + this.app.aws.user.id;
    }

    if (id) {
      urlParam += '&categories=' + id;
    }

    this.app.aws.postList(urlParam).add(data => {
      this.app.navigateToCategory(category);
      console.log(this.app.aws.currentCategory);
    });
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
