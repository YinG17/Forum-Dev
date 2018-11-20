import { Component, OnInit, Renderer } from '@angular/core';
import { AppService } from './shared/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public app: AppService, private renderer: Renderer) {
    this.renderer.listenGlobal('window', 'scroll', evt => {
      this.scroll(evt);
    });

    scrollTo(0, 0);
  }

  ngOnInit() {}

  public scroll(event) {
    const documentBody = event.target.body;
    const curScrollLoc = scrollY;
    const curPageHeight = documentBody.scrollHeight - documentBody.clientHeight;

    if (
      this.app.aws.posts.length !== 0 &&
      curScrollLoc >= curPageHeight - curPageHeight / 3 &&
      !this.app.loading
    ) {
      if (this.app.aws.currentPage < this.app.aws.currentTotalPages) {
        this.app.aws.currentPage++;
        this.app.page();
      } else {
        console.log('no more posts to load');
      }
    }
  }
}
