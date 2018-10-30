import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/shared/services/angular-wordpress-api.interface';
import { AngularWordpressApiService } from 'src/app/shared/services/angular-wordpress-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isEdit = false;
  userForm: UserInterface;

  constructor(public awService: AngularWordpressApiService) {}

  ngOnInit() {}

  update() {
    this.awService.updateProfile(this.userForm).subscribe(data => {
      this.isEdit = !this.isEdit;
    });
  }
}
