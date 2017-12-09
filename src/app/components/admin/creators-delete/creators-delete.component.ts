import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Creators {
  about: string;
  name: string;
  username: string;
}

@Component({
  selector: 'app-creators-delete',
  templateUrl: './creators-delete.component.html',
  styleUrls: ['./creators-delete.component.sass']
})
export class CreatorsDeleteComponent implements OnInit {

  private creatorsDocRef: AngularFirestoreDocument<Creators>;
  public creator$: Observable<Creators>;

  constructor(private afs: AngularFirestore, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.creatorsDocRef = this.afs.doc<Creators>('creators/' + this.dialogData.id);
    this.creator$ = this.creatorsDocRef.valueChanges();
  }

  onSubmit(button, text) {
    this.creatorsDocRef.delete();
  }

  ngOnInit() {
  }

}
