import { Component, OnInit, Input } from '@angular/core';
import { Reply } from '../../services/angular-wordpress-api.interface';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.scss']
})
export class RepliesComponent implements OnInit {
  @Input() reply: Reply = <any>[];

  constructor() {}

  ngOnInit() {}
}
