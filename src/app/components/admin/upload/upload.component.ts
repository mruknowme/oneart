import { Component } from '@angular/core';
import { UploadService } from './../../../services/admin/upload.service';
import { Upload } from './../../../classes/admin/upload';
import { MatSnackBar } from '@angular/material';
import * as _ from 'lodash';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface UploadI {
  name: string;
  url: string;
}

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

  uploadsColRef: AngularFirestoreCollection<UploadI>;
  uploads$: Observable<UploadI[]>;
  uploads: UploadI[];

  constructor(private upSvc: UploadService, private afs: AngularFirestore, public snackBar: MatSnackBar) {
    this.upSvc.uploadedFiles$.subscribe(files => this.uploadedFiles = files);
    this.upSvc.errorMess$.subscribe(status => this.errorMess = status);

    this.uploadsColRef = this.afs.collection<UploadI>('uploads');
    this.uploads$ = this.uploadsColRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as UploadI;
        const id = action.payload.doc.id;
        return { id, ...data};
      });
    });
    this.uploads$.subscribe(uploads => this.uploads = uploads);
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

  copyToClipboard() {
    this.snackBar.open('Скопировано!', null, {
      duration: 1500,
    });
  }

}
