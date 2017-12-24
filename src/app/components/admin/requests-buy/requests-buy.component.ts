import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { RequestsBuyAddComponent } from '../requests-buy-add/requests-buy-add.component';
import { RequestsBuyEditComponent } from '../requests-buy-edit/requests-buy-edit.component';

export interface BuyRequests extends Work {
  email: string;
  message: string;
  name: string;
  phone: string;
  status: string;
  work: string;
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
  selector: 'app-requests-buy',
  templateUrl: './requests-buy.component.html',
  styleUrls: ['./requests-buy.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class RequestsBuyComponent implements AfterViewInit {

  buyRequestsColRef: AngularFirestoreCollection<BuyRequests>;
  buyRequests$: Observable<BuyRequests[]>;

  worksColRef: AngularFirestoreCollection<Work>;
  works$: Observable<Work[]>;

  works: Work[];

  displayedColumns = ['work', 'name', 'phone', 'email', 'status', 'id'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private afs: AngularFirestore) {
    this.buyRequestsColRef = this.afs.collection<BuyRequests>('buy_requests', ref => {
      return ref.where('status', '==', 'open');
    });
    this.buyRequests$ = this.buyRequestsColRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as BuyRequests;
        const id = action.payload.doc.id;
        return { id, ...data};
      });
    });
    this.buyRequests$.subscribe(data => this.dataSource.data = data);

    this.worksColRef = this.afs.collection<Work>('works');
    this.works$ = this.worksColRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Work;
        const id = action.payload.doc.id;
        return { id, ...data};
      });
    });
    this.works$.subscribe(data => this.works = data);
    // console.log(this.dataSource.data);
  }

  matchWork(link) {
    if (this.works) {
      const work = this.works.filter(a => a.link === link);
      return `<h4 class="work-title">${work[0].title}</h4><br><img class="work-image"src="${work[0].images[0]}">`;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(RequestsBuyAddComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      result === true ? console.log('saved') : console.log('closed, not saved');
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  edit(id) {
    console.log(id);
    const dialogRef = this.dialog.open(RequestsBuyEditComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '50%',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      result === true ? console.log('saved') : console.log('closed, not saved');
    });
  }

  onTabChanged(event) {
    switch (event.index) {
      case 0:
        this.buyRequestsColRef = this.afs.collection<BuyRequests>('buy_requests', ref => {
          return ref.where('status', '==', 'open');
        });
        break;
      case 1:
        this.buyRequestsColRef = this.afs.collection<BuyRequests>('buy_requests', ref => {
          return ref.where('status', '==', 'complete');
        });
        break;
      case 2:
        this.buyRequestsColRef = this.afs.collection<BuyRequests>('buy_requests', ref => {
          return ref.where('status', '==', 'canceled');
        });
        break;
      default:
        this.buyRequestsColRef = this.afs.collection<BuyRequests>('buy_requests', ref => {
          return ref.where('status', '==', 'open');
        });
    }
    this.buyRequests$ = this.buyRequestsColRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as BuyRequests;
        const id = action.payload.doc.id;
        return { id, ...data};
      });
    });
    this.buyRequests$.subscribe(data => this.dataSource.data = data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
