import { Injectable } from '@angular/core';
import { Upload } from './../../classes/admin/upload';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {

  private uploadedFilesSource = new BehaviorSubject<any>(null);
  uploadedFiles$ = this.uploadedFilesSource.asObservable();

  private errorMessSource = new BehaviorSubject<boolean>(false);
  errorMess$ = this.errorMessSource.asObservable();

  uploadedFilesArr: any[] = [];

  constructor(private db: AngularFirestore) { }

  pushUpload(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`uploads/${upload.file.name}`).put(upload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        console.log((uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100);
      },
      (error: firebase.FirebaseError) => {
        // upload failed
        console.log(error);
        if (error.code === 'storage/unauthorized') {
          this.errorMessSource.next(true);
        }
      },
      () => {
        // upload success
        this.errorMessSource.next(false);
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.saveFileData(upload);
      }
    );
  }
  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.collection(`uploads`).add({
      url: upload.url,
      name: upload.name
    });
    this.uploadedFilesArr.push({name: upload.name, url: upload.url});
    this.uploadedFilesSource.next(this.uploadedFilesArr);
  }

  deleteFile(fileName) {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`uploads/${fileName}`);

    fileRef.delete().then(() => {
      const docToDelete = this.db.collection(`uploads`, ref => {
        return ref.where('name', '==', fileName);
      });
      const docToDelete$ = docToDelete.snapshotChanges().map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data();
          const id = action.payload.doc.id;
          return { id, ...data};
        });
      });
      docToDelete$.subscribe(doc => { this.db.doc(`uploads/${doc[0].id}`).delete(); console.log(`doc deleted:`, doc); } );
      this.uploadedFilesArr = this.uploadedFilesArr.filter(file => file.name !== fileName);
      this.uploadedFilesSource.next(this.uploadedFilesArr);
    }).catch(error => {
      console.log(error);
    });
  }

}
