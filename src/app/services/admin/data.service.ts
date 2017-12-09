import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Creators {
  id: string;
  about: string;
  name: string;
  username: string;
}

@Injectable()
export class DataService {

  creatorsColRef: AngularFirestoreCollection<Creators>;
  creators$: Observable<Creators[]>;

  dataSource: any;

  constructor(private afs: AngularFirestore) {
    this.creatorsColRef = this.afs.collection<Creators>('creators');
    this.creators$ = this.creatorsColRef.valueChanges();
    // this.creators$.subscribe(data => this.dataSource = new MatTableDataSource(data));
  }

}
