import { Component } from '@angular/core';
import { UploadService } from './../../../services/admin/upload.service';
import { Upload } from './../../../classes/admin/upload';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent {

  selectedFiles: FileList;
  currentUpload: Upload;

  uploadedFiles: any[] = [];

  uploadBtnDisabled = false;

  errorMess = false;

  constructor(private upSvc: UploadService) {
    this.upSvc.uploadedFiles$.subscribe(files => this.uploadedFiles = files);
    this.upSvc.errorMess$.subscribe(status => this.errorMess = status);
  }

  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }
  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload);
  }
  uploadMulti() {
    const files = this.selectedFiles;
    const filesIndex = _.range(files.length);
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      this.upSvc.pushUpload(this.currentUpload);
    });
    this.uploadBtnDisabled = true;
  }

  enableUploadBtn() {
    this.uploadBtnDisabled = false;
  }

  deleteFile(fileName) {
    this.upSvc.deleteFile(fileName);
  }

}
