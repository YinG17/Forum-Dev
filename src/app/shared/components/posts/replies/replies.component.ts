import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.scss']
})
export class RepliesComponent implements OnInit {
  show = false;

  @Input()
  comments: Array<any>;

  constructor() {}

  ngOnInit() {}
}
