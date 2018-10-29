import { Component, OnInit } from '@angular/core';
import { AngularWordpressApiUserService } from 'src/app/shared/services/angular-wordpress-api-user.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  constructor(public userService: AngularWordpressApiUserService) {}

  ngOnInit() {}
}
