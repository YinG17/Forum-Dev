import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(public appService: AppService) {}

  ngOnInit() {}

  getData(category, id?) {
    console.log(`category change, ${category}`);

    this.appService.aws.currentCategory = id;
    this.appService.aws.currentPageIndex = 1;

    let urlParam = '';

    if (this.appService.rootUrl === '/profile') {
      urlParam += 'author=' + this.appService.aws.user.id;
    }

    if (id) {
      urlParam += '&categories=' + id;
    }

    this.appService.aws.postList(urlParam).add(data => {
      this.appService.navigateToCategory(category);
    });
  }

  create() {
    this.appService.aws.compose = !this.appService.aws.compose;
    if (this.appService.aws.compose === true) {
      this.appService.navigateToPostCreate();
    } else {
      this.appService.navigate(this.appService.previousUrlAction);
    }
  }
}
