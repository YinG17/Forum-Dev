import { Component, OnInit } from '@angular/core';
import { AngularWordpressApiService } from '../../services/angular-wordpress-api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  constructor(public awService: AngularWordpressApiService) {}

  ngOnInit() {}
}
