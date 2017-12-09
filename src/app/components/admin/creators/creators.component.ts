import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { WorkAddComponent } from './../work-add/work-add.component';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Creators {
  id: string;
  about: string;
  name: string;
  username: string;
}

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CreatorsComponent implements AfterViewInit {

  creatorsColRef: AngularFirestoreCollection<Creators>;
  creators$: Observable<Creators[]>;

  displayedColumns = ['name', 'username', 'about', 'id'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private afs: AngularFirestore) {
    this.creatorsColRef = this.afs.collection<Creators>('creators');
    this.creators$ = this.creatorsColRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Creators;
        const id = action.payload.doc.id;
        return { id, ...data};
      });
    });
    this.creators$.subscribe(data => this.dataSource.data = data);
  }

  openDialog() {
    const dialogRef = this.dialog.open(WorkAddComponent, {
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
  }
}
