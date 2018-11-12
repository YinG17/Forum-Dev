import { Component, OnInit, Input } from '@angular/core';
import { UserResponseInterface } from 'src/app/shared/services/angular-wordpress-api.interface';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  @Input() user: UserResponseInterface = <any>[];
  constructor() {}

  ngOnInit() {}
}
