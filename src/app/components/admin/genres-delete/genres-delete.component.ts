import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Genres {
  alias: string;
  description: string;
  title: string;
}

@Component({
  selector: 'app-genres-delete',
  templateUrl: './genres-delete.component.html',
  styleUrls: ['./genres-delete.component.sass']
})
export class GenresDeleteComponent implements OnInit {

  private genresDocRef: AngularFirestoreDocument<Genres>;
  public genre$: Observable<Genres>;

  constructor(private afs: AngularFirestore, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.genresDocRef = this.afs.doc<Genres>('genres/' + this.dialogData.id);
    this.genre$ = this.genresDocRef.valueChanges();
  }

  onSubmit(button, text) {
    this.genresDocRef.delete();
  }

  ngOnInit() {
  }

}
