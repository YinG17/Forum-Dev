import { Component, OnInit, Input } from '@angular/core';
import { AngularWordpressApiService } from '../../services/angular-wordpress-api.service';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {
  @Input()
  emptyPost: string;

  @Input()
  fetchingPost: string;

  constructor(public awService: AngularWordpressApiService) {}

  ngOnInit() {}
}
