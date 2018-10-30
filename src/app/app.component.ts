import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularWordpressApiService } from 'src/app/shared/services/angular-wordpress-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'forum-dev';

  constructor(
    public awService: AngularWordpressApiService,
    public router: Router
  ) {}

  ngOnInit() {
    if (this.awService.isLogged) {
      this.router.navigateByUrl('forum');
    } else {
      this.router.navigateByUrl('');
    }
  }
}
