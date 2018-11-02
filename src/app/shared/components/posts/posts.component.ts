import { Component, OnInit } from '@angular/core';
import { AngularWordpressApiService } from '../../services/angular-wordpress-api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  previousPageSize: number;
  constructor(public awService: AngularWordpressApiService) {}

  ngOnInit() {}

  page(event) {
    // if previous page size is equal to the current pageSize, the event is page navigation
    if (this.previousPageSize === event.pageSize) {
      // if the previousPageIndex is lower than the current pageIndex, the event is next page navigation
      event.previousPageIndex < event.pageIndex
        ? (event.previousPageIndex++, this.awService.currentPageIndex++)
        : // else the event is previous page navigation
          (event.previousPageIndex--, this.awService.currentPageIndex--);
    } else {
      // else if the event is pageSize change, revert currentPageIndex to 1
      this.awService.currentPageIndex = 1;
      event.previousPageIndex = 0;
    }

    this.previousPageSize = event.pageSize;
    event.pageIndex++;

    this.awService.postList(
      'per_page=' + event.pageSize + '&page=' + event.pageIndex
    );
  }
}
