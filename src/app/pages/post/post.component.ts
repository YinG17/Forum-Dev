import { Component, OnInit } from '@angular/core';
import { PostInterface } from 'src/app/shared/services/angular-wordpress-api.interface';
import { AngularWordpressApiService } from 'src/app/shared/services/angular-wordpress-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  editForm: PostInterface = <any>{};

  constructor(
    public awService: AngularWordpressApiService,
    public router: Router
  ) {}

  ngOnInit() {}

  submit() {
    this.awService
      .postUpdate(this.editForm, '/' + this.awService.post.id)
      .subscribe(data => {
        this.router.navigateByUrl('post');
      });
  }
}
