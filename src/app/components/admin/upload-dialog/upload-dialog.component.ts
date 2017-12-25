import { Component, Inject, EventEmitter } from '@angular/core';
import { UploadService } from './../../../services/admin/upload.service';
import { Upload } from './../../../classes/admin/upload';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface UploadI {
  name: string;
  url: string;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.sass']
})
export class UploadDialogComponent {

  selectedFiles: FileList;
  currentUpload: Upload;

  uploadedFiles: {}[] = [];

  uploadBtnDisabled = false;

  errorMess = false;

  uploadsColRef: AngularFirestoreCollection<UploadI>;
  uploads$: Observable<UploadI[]>;
  uploads: UploadI[];

  isDialogWindow = false;

  chosenFiles: any[] = [];

  errorMessDynamic = '';

  chosenFilesMapped = new EventEmitter<string[]>(null);

  constructor(
    private upSvc: UploadService,
    private afs: AngularFirestore,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
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

    if (dialogData) { this.isDialogWindow = dialogData.isDialogWindow; }
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

  toggleChooseFile(fileName, fileUrl, event) {
      this.errorMessDynamic = '';
      if (this.chosenFiles.filter(file => file.name === fileName).length > 0) {
        event.target.textContent = 'Выбрать';
        this.chosenFiles = this.chosenFiles.filter(file => file.name !== fileName);
      } else {
        if (this.chosenFiles.length >= 15) {
          this.errorMessDynamic = 'Нельзя выбрать более 15 фотографий для одной картины!';
        } else {
          event.target.textContent = 'Отменить';
          this.chosenFiles.push({ name: fileName, url: fileUrl });
        }
      }
      console.log(`chosen files`, this.chosenFiles);
      console.log(`fileName`, fileName);
      console.log(`mapped`, this.chosenFiles.map(file => file.url));
      const mapped = this.chosenFiles.map(file => file.url);
      this.chosenFilesMapped.emit(mapped);
  }

  isChosen(fileName) {
    if (this.chosenFiles.filter(file => file.name === fileName).length > 0 && this.chosenFiles.length <= 15) {
      return 'accent';
    } else {
      return 'primary';
    }
  }

}
