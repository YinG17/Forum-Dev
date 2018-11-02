import { Component, OnInit } from '@angular/core';
import { AngularWordpressApiService } from '../../services/angular-wordpress-api.service';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {
  constructor(public awService: AngularWordpressApiService) {}

  ngOnInit() {
    console.log(this.awService.posts);
  }
}
