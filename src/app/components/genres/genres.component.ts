import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';

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
  images: any;
  link: string;
  price: number;
  title: string;
}

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.sass'],
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
export class GenresUserComponent implements OnInit {

  genresColRef: AngularFirestoreCollection<Genres>;
  genres$: Observable<Genres[]>;

  genresList: Genres[] = null;

  genreDesc: any = '';

  workColRef: AngularFirestoreCollection<Work>;
  works$: Observable<Work[]>;

  worksList: Work[];

  constructor(private afs: AngularFirestore, private activatedRoute: ActivatedRoute) {
    this.genresColRef = this.afs.collection<Genres>('genres', ref => ref.orderBy('title'));
    this.genres$ = this.genresColRef.valueChanges();
    this.genres$.subscribe(data => this.genresList = data);

    if (this.activatedRoute.snapshot.params.genre) {
      this.workColRef = this.afs.collection('works', ref => {
        return ref.where('genre_alias', '==', this.activatedRoute.snapshot.params.genre)
                  .orderBy('title');
      });
      this.works$ = this.workColRef.valueChanges();
      this.works$.subscribe(works => { this.worksList = works; });
      // implement logic for other content when no works 4 this genre
      this.getGenreDesc(this.activatedRoute.snapshot.params.genre);
    }

  }

  getGenreDesc(alias) {
    this.genresColRef = this.afs.collection<Genres>('genres', ref => ref.orderBy('title'));
    this.genres$ = this.genresColRef.valueChanges();
    this.genres$.subscribe(data => { this.genreDesc = data.find(genre => genre.alias === alias); });
  }

  switchGenre(genre_alias) {
    // add functionality for offline
    this.getGenreDesc(genre_alias);
    this.workColRef = this.afs.collection('works', ref => {
      return ref.where('genre_alias', '==', genre_alias)
                .orderBy('title');
    });
    this.works$ = this.workColRef.valueChanges();
    this.works$.subscribe(works => this.worksList = works);
  }

  ngOnInit() {
  }

}
