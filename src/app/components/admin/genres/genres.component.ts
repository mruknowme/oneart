import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { GenresAddComponent } from '../genres-add/genres-add.component';
import { GenresDeleteComponent } from '../genres-delete/genres-delete.component';
import { GenresEditComponent } from '../genres-edit/genres-edit.component';

export interface Genres {
  alias: string;
  description: string;
  title: string;
}

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class GenresComponent implements AfterViewInit {

  genresColRef: AngularFirestoreCollection<Genres>;
  genres$: Observable<Genres[]>;

  displayedColumns = ['title', 'alias', 'id'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private afs: AngularFirestore) {
    this.genresColRef = this.afs.collection<Genres>('genres');
    this.genres$ = this.genresColRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Genres;
        const id = action.payload.doc.id;
        return { id, ...data};
      });
    });
    this.genres$.subscribe(data => this.dataSource.data = data);
  }

  openDialog() {
    const dialogRef = this.dialog.open(GenresAddComponent, {
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
    const dialogRef = this.dialog.open(GenresEditComponent, {
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
    const dialogRef = this.dialog.open(GenresDeleteComponent, {
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
