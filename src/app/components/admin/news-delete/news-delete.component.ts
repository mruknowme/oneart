import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface News {
  created_at: string;
  date_end: string;
  date_start: string;
  desc_brief: string;
  desc_full: string;
  link: string;
  title: string;
}

@Component({
  selector: 'app-news-delete',
  templateUrl: './news-delete.component.html',
  styleUrls: ['./news-delete.component.sass']
})
export class NewsDeleteComponent implements OnInit {

  private newsDocRef: AngularFirestoreDocument<News>;
  public news$: Observable<News>;

  constructor(private afs: AngularFirestore, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.newsDocRef = this.afs.doc<News>('news/' + this.dialogData.id);
    this.news$ = this.newsDocRef.valueChanges();
  }

  onSubmit(button, text) {
    this.newsDocRef.delete();
  }

  ngOnInit() {
  }

}
