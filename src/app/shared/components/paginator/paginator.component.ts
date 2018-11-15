import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  previousPageSize: number;
  comment: string;

  constructor(public app: AppService) {}

  ngOnInit() {}

  page(event) {
    // if previous page size is equal to the current pageSize, the event is page navigation
    if (this.previousPageSize === event.pageSize) {
      // if the previousPageIndex is lower than the current pageIndex, the event is next page navigation
      event.previousPageIndex < event.pageIndex
        ? (event.previousPageIndex++, this.app.aws.currentPageIndex++)
        : // else the event is previous page navigation
          (event.previousPageIndex--, this.app.aws.currentPageIndex--);
    } else {
      // else if the event is pageSize change, revert currentPageIndex to 1
      event.previousPageIndex = 0;
      this.app.aws.currentPageIndex = 1;
    }

    this.previousPageSize = event.pageSize;
    event.pageIndex++;

    let url = 'per_page=' + event.pageSize + '&page=' + event.pageIndex;

    if (this.app.rootUrl === '/profile') {
      url += '&author=' + this.app.aws.user.id;
    }

    this.app.aws.postList(url).subscribe(res => res);
  }
}
