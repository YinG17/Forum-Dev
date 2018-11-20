import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Category } from '../../services/angular-wordpress-api.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() categories: Category[];

  constructor(public app: AppService) {}

  ngOnInit() {}

  getData(filter?, id?) {
    if (id) {
      this.app.aws.currentCategory = id;
      this.app.status = null;
    } else {
      this.app.aws.currentCategory = null;
      this.app.status = filter;
    }

    this.app.aws.currentPage = 1;
    this.app.loading = true;
    this.app.aws.posts = [];

    this.app.aws.postList(this.app.filter).subscribe(
      data => {
        this.app.aws.posts = data.body;
      },
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
