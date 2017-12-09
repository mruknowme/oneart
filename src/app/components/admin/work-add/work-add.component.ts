import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Genres {
  alias: string;
  description: string;
  title: string;
}
export interface Creators {
  about: string;
  name: string;
  username: string;
}

@Component({
  selector: 'app-work-add',
  templateUrl: './work-add.component.html',
  styleUrls: ['./work-add.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class WorkAddComponent implements OnInit {

  genresColRef: AngularFirestoreCollection<Genres>;
  genres$: Observable<Genres[]>;

  creatorsColRef: AngularFirestoreCollection<Creators>;
  creators$: Observable<Creators[]>;

  constructor(public dialogRef: MatDialogRef<WorkAddComponent>, private afs: AngularFirestore) {
    this.genresColRef = this.afs.collection<Genres>('genres', ref => ref.orderBy('title'));
    this.genres$ = this.genresColRef.valueChanges();

    this.creatorsColRef = this.afs.collection<Creators>('creators', ref => ref.orderBy('name'));
    this.creators$ = this.creatorsColRef.valueChanges();
  }

  closeDialog() {
    // this.dialogRef.close('Pizza!');
  }

  ngOnInit() {
  }

}
