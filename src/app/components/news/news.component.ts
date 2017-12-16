import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
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
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('goals', [ // add leave animation
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, offset: 0}),
            style({opacity: .5, offset: 0.3}),
            style({opacity: 1, offset: 1.0}),
          ]))]), {optional: true}),
        query(':leave', stagger('300ms', [
          animate('.6s ease-out', keyframes([
            style({opacity: 1, offset: 0}),
            style({opacity: .5, offset: 0.3}),
            style({opacity: 0, offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])
  ]
})
export class NewsUserComponent implements OnInit {

  newsColRef: AngularFirestoreCollection<News>;
  news$: Observable<News[]>;

  newsList: News[];

  constructor(private afs: AngularFirestore) {
    this.newsColRef = this.afs.collection<News>('news', ref => ref.orderBy('created_at'));
    this.news$ = this.newsColRef.valueChanges();
    this.news$.subscribe(data => this.newsList = data);
  }

  ngOnInit() {
  }

}
