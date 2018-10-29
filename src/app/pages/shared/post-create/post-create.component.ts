import { Component } from '@angular/core';
import { AngularWordpressApiPostService } from 'src/app/shared/services/angular-wordpress-api-post.service';
import { AngularWordpressApiUserService } from 'src/app/shared/services/angular-wordpress-api-user.service';
import { PostInterface } from 'src/app/shared/services/angular-wordpress-api.interface';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  status = ['draft', 'publish'];
  postForm: PostInterface = <any>{};

  constructor(
    public postService: AngularWordpressApiPostService,
    public userService: AngularWordpressApiUserService
  ) {}

  post() {
    this.postForm.categories = this.postService.selectedCategory;

    this.postService
      .postCreate(this.postForm)
      .subscribe(data => {}, err => console.log(err));
  }
}
