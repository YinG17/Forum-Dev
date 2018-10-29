import { Component, OnInit, Input } from '@angular/core';
import { PostInterface } from 'src/app/shared/services/angular-wordpress-api.interface';
import { AngularWordpressApiPostService } from 'src/app/shared/services/angular-wordpress-api-post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  @Input()
  post: PostInterface;

  editForm: PostInterface = <any>{};

  constructor(public postService: AngularWordpressApiPostService) {}

  ngOnInit() {}

  submit() {
    this.postService.editPost(this.editForm, '/' + this.postService.post.id);
  }
}
