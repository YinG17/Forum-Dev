import { Component, OnInit } from '@angular/core';
import { PostInterface } from 'src/app/shared/services/angular-wordpress-api.interface';
import { AngularWordpressApiPostService } from 'src/app/shared/services/angular-wordpress-api-post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  editForm: PostInterface = <any>{};

  constructor(public postService: AngularWordpressApiPostService) {}

  ngOnInit() {}

  submit() {
    this.postService.updatePost(this.editForm, '/' + this.postService.post.id);
  }
}
