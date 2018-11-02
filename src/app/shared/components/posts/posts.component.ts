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
    if (this.previousPageSize && this.previousPageSize === event.pageSize) {
      event.previousPageIndex < event.pageIndex
        ? (event.previousPageIndex++, this.awService.currentPageIndex++)
        : (event.previousPageIndex--, this.awService.currentPageIndex--);
    } else {
      /**
       * this is optional I guess?, if this is added to the process, everytime a user change the 'item per page' value in
       * the paginator, it will show the very first page of the query and the very last post from that first page of posts.
       *
       * it it is not added, like right now, only if the user navigate to any page rather than the first one, the view will retain
       * the last post then will add the rest.
       */
      // this.awService.currentPageIndex = 1;
    }

    event.pageIndex = this.awService.currentPageIndex;
    this.previousPageSize = event.pageSize;

    this.awService.postList(
      'per_page=' + event.pageSize + '&page=' + event.pageIndex
    );
  }
}
