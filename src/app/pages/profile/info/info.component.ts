import { Component, OnInit, Input } from '@angular/core';
import { UserResponse } from 'src/app/shared/services/angular-wordpress-api.interface';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  @Input() user: UserResponse = <any>[];
  isEdit = false;
  constructor(public app: AppService) {}

  ngOnInit() {}

  submit() {
    this.app.aws.updateProfile(this.user).subscribe(data => {
      console.log(data);
      this.isEdit = false;
    });
  }
}
