import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/operator/mergeMap';
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
  selector: 'app-news-single',
  templateUrl: './news-single.component.html',
  styleUrls: ['./news-single.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class NewsSingleComponent implements OnInit {

  newsColRef: AngularFirestoreCollection<News>;
  news$: Observable<News[]>;

  constructor(private afs: AngularFirestore, private activatedRoute: ActivatedRoute) {
    this.newsColRef = this.afs.collection('news', ref => {
      return ref.where('link', '==', this.activatedRoute.snapshot.params.link)
                .limit(1);
    });
    this.news$ = this.newsColRef.valueChanges();
  }

  ngOnInit() {
  }

}
