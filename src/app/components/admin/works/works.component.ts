import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { WorkAddComponent } from './../work-add/work-add.component';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { WorksDeleteComponent } from '../works-delete/works-delete.component';
import { WorksEditComponent } from '../works-edit/works-edit.component';

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
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class WorksComponent implements AfterViewInit {

  worksColRef: AngularFirestoreCollection<Work>;
  works$: Observable<Work[]>;

  displayedColumns = ['title', 'genre', 'creator', 'price', 'created_at', 'id'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private afs: AngularFirestore) {
    this.worksColRef = this.afs.collection<Work>('works');
    this.works$ = this.worksColRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Work;
        const id = action.payload.doc.id;
        return { id, ...data};
      });
    });
    this.works$.subscribe(data => this.dataSource.data = data);
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
    const dialogRef = this.dialog.open(WorksEditComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '50%',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      result === true ? console.log('saved') : console.log('closed, not saved');
    });
  }

  delete(id) {
    console.log(id);
    const dialogRef = this.dialog.open(WorksDeleteComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '50%',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      result === true ? console.log('deleted') : console.log('closed, not deleted');
    });
  }

}
