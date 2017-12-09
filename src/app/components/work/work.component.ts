import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';

export interface Work {
  created_at: string;
  creator: string;
  creator_username: string;
  description: string;
  genre: string;
  genre_alias: string;
  images: any;
  link: string;
  price: number;
  title: string;
}

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class WorkComponent implements OnInit {

  workRef: AngularFirestoreCollection<Work>;
  work$: Observable<Work[]>;

  constructor(private afs: AngularFirestore, private activatedRoute: ActivatedRoute) {
    this.workRef = this.afs.collection('works', ref => {
      return ref.where('link', '==', this.activatedRoute.snapshot.params.alias)
                .limit(1);
    });
    this.work$ = this.workRef.valueChanges();
  }

  ngOnInit() {
  }

}
