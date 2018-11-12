import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(public app: AppService) {}

  ngOnInit() {}

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
    this.app.aws.compose = !this.app.aws.compose;
    if (this.app.aws.compose === true) {
      this.app.navigateToPostCreate();
    } else {
      this.app.navigate(this.app.previousUrlAction);
    }
  }
}
