import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  worksRef: AngularFirestoreCollection<Work>;
  works$: Observable<Work[]>;

  constructor(private afs: AngularFirestore) {
    this.worksRef = this.afs.collection<Work>('works', ref => {
      return ref.limit(5);
    });
    this.works$ = this.worksRef.valueChanges();
  }

  onTap() {
    console.log('tapped');
  }

  ngOnInit() {
  }

}
