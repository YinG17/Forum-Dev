import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './shared/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'forum-dev';

  constructor(public app: AppService, public router: Router) {}

  ngOnInit() {}
}
