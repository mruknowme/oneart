import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { RequestsContactViewComponent } from '../requests-contact-view/requests-contact-view.component';

export interface ContactRequest {
  created_at: Date;
  email: string;
  messgae: string;
  name: string;
  phone: string;
}

@Component({
  selector: 'app-requests-contact',
  templateUrl: './requests-contact.component.html',
  styleUrls: ['./requests-contact.component.sass']
})
export class RequestsContactComponent implements AfterViewInit {

  contactRequestsColRef: AngularFirestoreCollection<ContactRequest>;
  contactRequests$: Observable<ContactRequest[]>;

  displayedColumns = ['name', 'phone', 'email', 'message', 'created_at', 'id'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private afs: AngularFirestore) {
    this.contactRequestsColRef = this.afs.collection<ContactRequest>('contact_requests');
    this.contactRequests$ = this.contactRequestsColRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as ContactRequest;
        const id = action.payload.doc.id;
        return { id, ...data};
      });
    });
    this.contactRequests$.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(GenresAddComponent, {
  //     width: 'auto',
  //     height: 'auto',
  //     minWidth: '50%'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     result === true ? console.log('saved') : console.log('closed, not saved');
  //   });
  // }

  view(id) {
    console.log(id);
    const dialogRef = this.dialog.open(RequestsContactViewComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '50%',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      result === true ? console.log('saved') : console.log('closed, not saved');
    });
  }

  reply(id) {
    const email = this.dataSource.data.find(item => (item as any).id === id);
    // console.log((email as ContactRequest).email);
    window.open(`mailto:${(email as ContactRequest).email}`);
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

}
