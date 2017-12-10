import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Work {
  created_at: string;
  creator: string;
  creator_username: string;
  description: string;
  genre: string;
  genre_alias: string;
  images: string[];
  link: string;
  price: number;
  title: string;
}

@Component({
  selector: 'app-works-delete',
  templateUrl: './works-delete.component.html',
  styleUrls: ['./works-delete.component.sass']
})
export class WorksDeleteComponent implements OnInit {

  private worksDocRef: AngularFirestoreDocument<Work>;
  public work$: Observable<Work>;

  constructor(private afs: AngularFirestore, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.worksDocRef = this.afs.doc<Work>('works/' + this.dialogData.id);
    this.work$ = this.worksDocRef.valueChanges();
  }

  onSubmit(button, text) {
    this.worksDocRef.delete();
  }

  ngOnInit() {
  }

}
