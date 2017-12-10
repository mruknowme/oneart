import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Creators {
  id: string;
  about: string;
  name: string;
  username: string;
}

export interface Genres {
  alias: string;
  description: string;
  title: string;
}

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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  creators: Creators[];
  genres: Genres[];
  works: Work[];

  creatorsColRef: AngularFirestoreCollection<Creators>;
  creators$: Observable<Creators[]>;

  genresColRef: AngularFirestoreCollection<Genres>;
  genres$: Observable<Genres[]>;

  worksColRef: AngularFirestoreCollection<Work>;
  works$: Observable<Work[]>;

  constructor(private afs: AngularFirestore) {
    this.creatorsColRef = this.afs.collection<Creators>('creators');
    this.creators$ = this.creatorsColRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Creators;
        const id = action.payload.doc.id;
        return { id, ...data};
      });
    });
    this.creators$.subscribe(data => this.creators = data);

    this.genresColRef = this.afs.collection<Genres>('genres');
    this.genres$ = this.genresColRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Genres;
        const id = action.payload.doc.id;
        return { id, ...data};
      });
    });
    this.genres$.subscribe(data => this.genres = data);

    this.worksColRef = this.afs.collection<Work>('works');
    this.works$ = this.worksColRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Work;
        const id = action.payload.doc.id;
        return { id, ...data};
      });
    });
    this.works$.subscribe(data => this.works = data);
  }

  ngOnInit() {
  }

}
