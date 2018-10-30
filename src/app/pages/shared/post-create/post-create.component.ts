import { Component } from '@angular/core';
import { AngularWordpressApiService } from 'src/app/shared/services/angular-wordpress-api.service';
import { PostInterface } from 'src/app/shared/services/angular-wordpress-api.interface';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  status = ['draft', 'publish'];
  postForm: PostInterface = <any>{};

  constructor(public awService: AngularWordpressApiService) {}

  post() {
    this.postForm.categories = this.awService.currentCategory;

    this.awService.postCreate(this.postForm);
  }
}
