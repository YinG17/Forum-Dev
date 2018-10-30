import { Component, OnInit } from '@angular/core';
import { AngularWordpressApiService } from 'src/app/shared/services/angular-wordpress-api.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  constructor(public awService: AngularWordpressApiService) {}

  ngOnInit() {}
}
