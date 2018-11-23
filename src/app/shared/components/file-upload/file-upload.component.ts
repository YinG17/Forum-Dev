import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() url: string;
  @Input() fileName: string;

  @Output() fileID = new EventEmitter<number>();

  fileToUpload = new FormData();

  constructor(public app: AppService) {}

  ngOnInit() {}

  /**
   * this function will serve as presenting/rendering a temporary data to the user when they selects an image
   * to upload, and change when they change it.
   *
   * it helps to prevent unnecessary uploads, but posting will suffer since it will handle 2 request for posting a
   * media post and then posting a post.
   * @param event event data
   */
  onFileChanged(event) {
    if (event.target.files[0]) {
      const file = event.target.files[0];

      this.fileToUpload.append('file', file);
      this.fileToUpload.append('title', file.name);
      this.url = URL.createObjectURL(file);
      this.fileName = file.name;
    }
  }

  uploadAttachment(): Subscription {
    return this.app.aws.mediaUpload(this.fileToUpload).subscribe(
      data => {
        this.fileID.emit(data['id']);
      },
      err => this.app.log.handleError(err)
    );
  }

  attachmentInit() {
    this.url = '';
    this.fileToUpload = new FormData();

    this.fileID.emit(0);
  }
}
